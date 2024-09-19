package day1;

public class ExampleFive {
    public static void main(String[] args) {
        System.out.println(26 % 3);  // prints 2 the remainder
        
        int x = 53;
        // check if x is a multiple of 3
        // use mod and check if remainder is 0
        System.out.println(x % 3 == 0);

        int y = 36;
        System.out.println(y % 3 == 0); // 36 is a multiple of 3 so the remainder is 0
    }
}
