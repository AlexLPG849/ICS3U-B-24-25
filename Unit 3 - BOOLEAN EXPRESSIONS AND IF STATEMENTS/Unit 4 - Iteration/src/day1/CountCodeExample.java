package day1;

public class CountCodeExample {
    public static void main(String[] args) {
        System.out.println(countCode("codecodecodehi"));
       
    }

    public static int countCode(String str) {
        int numCode = 0;
        for (int i = 0; i <= str.length() - 4; i++) {
            String letter = str.substring(i, i+4);
            if (letter.equals("code"))
                numCode++;

        }
        return numCode;
    }
    
}

