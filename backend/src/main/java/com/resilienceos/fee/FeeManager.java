package com.resilienceos.fee;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FeeManager {
    private final Map<String, Fee> feesByStudent = new HashMap<>();

    public void addFee(String studentId, double totalFee) {
        if (feesByStudent.containsKey(studentId)) {
            throw new IllegalArgumentException("Fee already exists for student: " + studentId);
        }
        feesByStudent.put(studentId, new Fee(studentId, totalFee));
    }

    public Fee getFee(String studentId) throws FeeNotFoundException {
        Fee fee = feesByStudent.get(studentId);
        if (fee == null) {
            throw new FeeNotFoundException(studentId);
        }
        return fee;
    }

    public List<Fee> getPaidFees() {
        List<Fee> result = new ArrayList<>();
        for (Fee fee : feesByStudent.values()) {
            if (fee.getStatus() == FeeStatus.PAID) {
                result.add(fee);
            }
        }
        return result;
    }

    public List<Fee> getPendingFees() {
        List<Fee> result = new ArrayList<>();
        for (Fee fee : feesByStudent.values()) {
            if (fee.getStatus() != FeeStatus.PAID) {
                result.add(fee);
            }
        }
        return result;
    }

    public List<Fee> getAllFees() {
        return new ArrayList<>(feesByStudent.values());
    }

    public int getStudentCount() {
        return feesByStudent.size();
    }
}
