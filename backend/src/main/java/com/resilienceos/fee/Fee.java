package com.resilienceos.fee;

public class Fee extends FeeRecord {
    private final double totalFee;
    private double paidAmount;

    public Fee(String studentId, double totalFee) {
        super(studentId);
        if (totalFee <= 0) {
            throw new IllegalArgumentException("Total fee must be positive");
        }
        this.totalFee = totalFee;
    }

    public double getTotalFee() {
        return totalFee;
    }

    public double getPaidAmount() {
        return paidAmount;
    }

    public void addPayment(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Payment amount must be positive");
        }
        if (amount > getRemainingBalance()) {
            throw new IllegalArgumentException("Payment exceeds the remaining fee balance");
        }
        paidAmount += amount;
    }

    @Override
    public double getRemainingBalance() {
        return Math.max(0, totalFee - paidAmount);
    }

    @Override
    public FeeStatus getStatus() {
        if (paidAmount <= 0) {
            return FeeStatus.PENDING;
        }
        return getRemainingBalance() == 0 ? FeeStatus.PAID : FeeStatus.PARTIALLY_PAID;
    }
}
