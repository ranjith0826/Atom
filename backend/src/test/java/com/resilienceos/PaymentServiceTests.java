package com.resilienceos;

import com.resilienceos.fee.FeeManager;
import com.resilienceos.fee.FeeNotFoundException;
import com.resilienceos.fee.InvalidPaymentException;
import com.resilienceos.fee.Payment;
import com.resilienceos.fee.PaymentService;
import com.resilienceos.fee.PaymentStatus;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class PaymentServiceTests {
    @Test
    void recordsPaymentAndCalculatesRemainingBalance()
            throws FeeNotFoundException, InvalidPaymentException {
        FeeManager manager = new FeeManager();
        manager.addFee("S101", 50_000);
        PaymentService payments = new PaymentService(manager);

        Payment payment = payments.recordPayment("S101", 30_000);

        assertEquals(30_000, payment.getAmount());
        assertEquals(20_000, manager.getFee("S101").getRemainingBalance());
        assertEquals(1, payments.getPaymentHistory("S101").size());
    }

    @Test
    void rejectsPaymentsAboveRemainingBalance() {
        FeeManager manager = new FeeManager();
        manager.addFee("S101", 50_000);
        PaymentService payments = new PaymentService(manager);

        assertThrows(InvalidPaymentException.class,
                () -> payments.recordPayment("S101", 50_001));
    }

    @Test
    void updatesPaymentStatus()
            throws FeeNotFoundException, InvalidPaymentException {
        FeeManager manager = new FeeManager();
        manager.addFee("S101", 50_000);
        PaymentService payments = new PaymentService(manager);
        Payment payment = payments.recordPayment("S101", 10_000);

        payments.updatePaymentStatus("S101", payment.getPaymentId(), PaymentStatus.CANCELLED);

        assertEquals(PaymentStatus.CANCELLED,
                payments.getPaymentHistory("S101").iterator().next().getStatus());
    }
}
