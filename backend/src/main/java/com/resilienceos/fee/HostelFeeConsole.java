package com.resilienceos.fee;

import java.util.List;
import java.util.Locale;
import java.util.Scanner;

public class HostelFeeConsole {
    public static void main(String[] args) {
        FeeManager feeManager = new FeeManager();
        feeManager.addFee("S101", 50_000);
        feeManager.addFee("S102", 50_000);

        PaymentService paymentService = new PaymentService(feeManager);
        Scanner scanner = new Scanner(System.in);
        System.out.println("Hostel Fee Management System");

        boolean running = true;
        while (running) {
            printMenu();
            String choice = scanner.nextLine().trim();
            try {
                switch (choice) {
                    case "1" -> addFee(scanner, feeManager);
                    case "2" -> recordPayment(scanner, paymentService);
                    case "3" -> printAllFees(feeManager);
                    case "4" -> printPaidFees(feeManager);
                    case "5" -> printPendingFees(feeManager);
                    case "6" -> printBalance(scanner, feeManager);
                    case "7" -> printHistory(scanner, paymentService);
                    case "8" -> running = false;
                    default -> System.out.println("Invalid menu option.");
                }
            } catch (FeeNotFoundException | InvalidPaymentException | IllegalArgumentException ex) {
                System.out.println("Error: " + ex.getMessage());
            }
        }
        scanner.close();
        System.out.println("Goodbye.");
    }

    private static void printMenu() {
        System.out.println("""

                1. Add student fee
                2. Record payment
                3. View all fees
                4. View paid fees
                5. View pending fees
                6. Check remaining balance
                7. View payment history
                8. Exit
                Choose an option:""");
    }

    private static void addFee(Scanner scanner, FeeManager feeManager) {
        System.out.print("Student ID: ");
        String studentId = scanner.nextLine().trim();
        System.out.print("Total fee: ");
        double totalFee = readAmount(scanner);
        feeManager.addFee(studentId, totalFee);
        System.out.println("Fee added successfully.");
    }

    private static void recordPayment(Scanner scanner, PaymentService paymentService)
            throws FeeNotFoundException, InvalidPaymentException {
        System.out.print("Student ID: ");
        String studentId = scanner.nextLine().trim();
        System.out.print("Payment amount: ");
        double amount = readAmount(scanner);
        Payment payment = paymentService.recordPayment(studentId, amount);
        System.out.println("Payment recorded: " + payment.getPaymentId());
    }

    private static void printAllFees(FeeManager feeManager) {
        printFeeList(feeManager.getAllFees());
    }

    private static void printPaidFees(FeeManager feeManager) {
        printFeeList(feeManager.getPaidFees());
    }

    private static void printPendingFees(FeeManager feeManager) {
        printFeeList(feeManager.getPendingFees());
    }

    private static void printBalance(Scanner scanner, FeeManager feeManager)
            throws FeeNotFoundException {
        System.out.print("Student ID: ");
        Fee fee = feeManager.getFee(scanner.nextLine().trim());
        System.out.printf(Locale.US, "Remaining balance: ₹%.2f%n", fee.getRemainingBalance());
    }

    private static void printHistory(Scanner scanner, PaymentService paymentService)
            throws FeeNotFoundException {
        System.out.print("Student ID: ");
        String studentId = scanner.nextLine().trim();
        PaymentHistory<Payment> history = paymentService.getPaymentHistory(studentId);
        if (history.isEmpty()) {
            System.out.println("No payment history found.");
            return;
        }
        for (Payment payment : history) {
            System.out.printf(Locale.US, "%s | ₹%.2f | %s | %s%n",
                    payment.getPaymentId(),
                    payment.getAmount(),
                    payment.getPaidAt(),
                    payment.getStatus());
        }
    }

    private static void printFeeList(List<Fee> fees) {
        if (fees.isEmpty()) {
            System.out.println("No matching fee records.");
            return;
        }
        for (Fee fee : fees) {
            System.out.printf(Locale.US,
                    "%s | Total: ₹%.2f | Paid: ₹%.2f | Pending: ₹%.2f | %s%n",
                    fee.getStudentId(),
                    fee.getTotalFee(),
                    fee.getPaidAmount(),
                    fee.getRemainingBalance(),
                    fee.getStatus());
        }
    }

    private static double readAmount(Scanner scanner) {
        String value = scanner.nextLine().trim();
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException("Please enter a valid fee amount");
        }
    }
}
