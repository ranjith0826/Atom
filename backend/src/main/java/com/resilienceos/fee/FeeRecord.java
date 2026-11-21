package com.resilienceos.fee;

public abstract class FeeRecord {
    private final String studentId;

    protected FeeRecord(String studentId) {
        if (studentId == null || studentId.isBlank()) {
            throw new IllegalArgumentException("Student ID is required");
        }
        this.studentId = studentId;
    }

    public String getStudentId() {
        return studentId;
    }

    public abstract double getRemainingBalance();

    public abstract FeeStatus getStatus();
}
