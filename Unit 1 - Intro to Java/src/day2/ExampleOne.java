package day2;

public class ExampleOne {
    public static void main(String[] args) {
        final int number = 4938;

        // get the sum of the individual digits in the number
        // use / and %

        int digit1 = number / 1000; // 4938 / 1000 = 4
        int digit2 = number / 100 % 10; // 4938 / 100 = 49 % 10 = 9
        int digit3 = number / 10 % 10; // 4938 / 10 = 493 % 10 = 3
        int digit4 = number % 10;  // 4938 % 10 = 8
        int sum = digit1 + digit2 + digit3 + digit4;
        System.out.println(" ");
        System.out.println(sum);
    }
}
