package com.resilienceos.fee;

import java.time.LocalDateTime;

public class Payment {
    private final String paymentId;
    private final double amount;
    private final LocalDateTime paidAt;
    private PaymentStatus status;

    public Payment(String paymentId, double amount, LocalDateTime paidAt) {
        if (paymentId == null || paymentId.isBlank()) {
            throw new IllegalArgumentException("Payment ID is required");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Payment amount must be positive");
        }
        this.paymentId = paymentId;
        this.amount = amount;
        this.paidAt = paidAt == null ? LocalDateTime.now() : paidAt;
        this.status = PaymentStatus.PAID;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public double getAmount() {
        return amount;
    }

    public LocalDateTime getPaidAt() {
        return paidAt;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        if (status == null) {
            throw new IllegalArgumentException("Payment status is required");
        }
        this.status = status;
    }
}
