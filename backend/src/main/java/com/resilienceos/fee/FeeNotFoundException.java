package com.resilienceos.fee;

public class FeeNotFoundException extends Exception {
    public FeeNotFoundException(String studentId) {
        super("Fee record not found for student: " + studentId);
    }
}
