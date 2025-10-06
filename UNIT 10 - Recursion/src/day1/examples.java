package day1;

public class examples {

    static long[] solutions;

    public static void main(String[] args) {
        // System.out.println(recursiveFactorial(7));
        int n = 100;
        solutions = new long[n+1];
        System.out.println(fibonacci(7));
    }
                
    private static long fibonacci(int n) {
        if (n == 1 || n == 2)
            return 1;

        if (solutions[n] != 0)
            return solutions[n];
        
        return fibonacci(n-1) + fibonacci(n-2);
    }
        
            private static int recursiveFactorial(int n) {
        if (n == 1)
            return 1;
        return n * recursiveFactorial(n-1);
    }
}
