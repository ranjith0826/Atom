package com.resilienceos.fee;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public class PaymentService {
    private final FeeManager feeManager;
    private final Map<String, PaymentHistory<Payment>> histories = new HashMap<>();
    private final AtomicInteger paymentSequence = new AtomicInteger(1);

    public PaymentService(FeeManager feeManager) {
        this.feeManager = feeManager;
    }

    public Payment recordPayment(String studentId, double amount)
            throws FeeNotFoundException, InvalidPaymentException {
        Fee fee = feeManager.getFee(studentId);
        if (amount <= 0) {
            throw new InvalidPaymentException("Payment amount must be positive");
        }
        if (amount > fee.getRemainingBalance()) {
            throw new InvalidPaymentException(
                    "Payment exceeds the remaining balance of " + fee.getRemainingBalance());
        }

        fee.addPayment(amount);
        Payment payment = new Payment(
                "PAY-" + studentId + "-" + paymentSequence.getAndIncrement(),
                amount,
                LocalDateTime.now());
        histories.computeIfAbsent(studentId, key -> new PaymentHistory<>()).add(payment);
        return payment;
    }

    public PaymentHistory<Payment> getPaymentHistory(String studentId) throws FeeNotFoundException {
        feeManager.getFee(studentId);
        PaymentHistory<Payment> history = histories.get(studentId);
        if (history == null) {
            return new PaymentHistory<>();
        }
        return history;
    }

    public void updatePaymentStatus(String studentId, String paymentId, PaymentStatus status)
            throws FeeNotFoundException, InvalidPaymentException {
        feeManager.getFee(studentId);
        PaymentHistory<Payment> history = histories.get(studentId);
        if (history == null) {
            throw new InvalidPaymentException("No payment history found for student: " + studentId);
        }
        for (Payment payment : history) {
            if (payment.getPaymentId().equals(paymentId)) {
                payment.setStatus(status);
                return;
            }
        }
        throw new InvalidPaymentException("Payment not found: " + paymentId);
    }
}
