package com.resilienceos.fee;

import com.resilienceos.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/fees")
public class FeeController {
    private final FeeManager feeManager;
    private final PaymentService paymentService;

    public FeeController() {
        feeManager = new FeeManager();
        feeManager.addFee("S101", 50_000);
        feeManager.addFee("S102", 50_000);
        paymentService = new PaymentService(feeManager);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Fee>> addFee(@RequestBody Map<String, Object> request) {
        String studentId = String.valueOf(request.get("studentId"));
        double totalFee = Double.parseDouble(String.valueOf(request.get("totalFee")));
        feeManager.addFee(studentId, totalFee);
        try {
            return ResponseEntity.ok(ApiResponse.ok("Fee added", feeManager.getFee(studentId)));
        } catch (FeeNotFoundException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }

    @PostMapping("/{studentId}/payments")
    public ResponseEntity<ApiResponse<Payment>> recordPayment(
            @PathVariable String studentId,
            @RequestBody Map<String, Object> request) {
        try {
            double amount = Double.parseDouble(String.valueOf(request.get("amount")));
            Payment payment = paymentService.recordPayment(studentId, amount);
            return ResponseEntity.ok(ApiResponse.ok("Payment recorded", payment));
        } catch (FeeNotFoundException | InvalidPaymentException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Fee>>> getAllFees() {
        return ResponseEntity.ok(ApiResponse.ok("All fee records", feeManager.getAllFees()));
    }

    @GetMapping("/paid")
    public ResponseEntity<ApiResponse<List<Fee>>> getPaidFees() {
        return ResponseEntity.ok(ApiResponse.ok("Paid fee records", feeManager.getPaidFees()));
    }

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<Fee>>> getPendingFees() {
        return ResponseEntity.ok(ApiResponse.ok("Pending fee records", feeManager.getPendingFees()));
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<ApiResponse<Fee>> getFee(@PathVariable String studentId) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Fee record", feeManager.getFee(studentId)));
        } catch (FeeNotFoundException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }

    @GetMapping("/{studentId}/history")
    public ResponseEntity<ApiResponse<List<Payment>>> getHistory(@PathVariable String studentId) {
        try {
            List<Payment> payments = new ArrayList<>();
            paymentService.getPaymentHistory(studentId).forEach(payments::add);
            return ResponseEntity.ok(ApiResponse.ok("Payment history", payments));
        } catch (FeeNotFoundException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }

    @PutMapping("/{studentId}/payments/{paymentId}")
    public ResponseEntity<ApiResponse<Void>> updateStatus(
            @PathVariable String studentId,
            @PathVariable String paymentId,
            @RequestBody Map<String, Object> request) {
        try {
            PaymentStatus status = PaymentStatus.valueOf(
                    String.valueOf(request.get("status")).trim().toUpperCase());
            paymentService.updatePaymentStatus(studentId, paymentId, status);
            return ResponseEntity.ok(ApiResponse.ok("Payment status updated", null));
        } catch (FeeNotFoundException | InvalidPaymentException | IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }
}
