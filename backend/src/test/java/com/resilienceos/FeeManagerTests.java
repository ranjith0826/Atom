package com.resilienceos;

import com.resilienceos.fee.FeeManager;
import com.resilienceos.fee.FeeNotFoundException;
import com.resilienceos.fee.FeeStatus;
import com.resilienceos.fee.PaymentService;
import com.resilienceos.fee.InvalidPaymentException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class FeeManagerTests {
    @Test
    void tracksPaidAndPendingFees() throws FeeNotFoundException, InvalidPaymentException {
        FeeManager manager = new FeeManager();
        manager.addFee("S101", 50_000);
        manager.addFee("S102", 50_000);
        PaymentService payments = new PaymentService(manager);

        payments.recordPayment("S102", 50_000);

        assertEquals(1, manager.getPaidFees().size());
        assertEquals(1, manager.getPendingFees().size());
        assertEquals(FeeStatus.PAID, manager.getFee("S102").getStatus());
    }

    @Test
    void throwsWhenFeeDoesNotExist() {
        FeeManager manager = new FeeManager();
        assertThrows(FeeNotFoundException.class, () -> manager.getFee("UNKNOWN"));
    }
}
