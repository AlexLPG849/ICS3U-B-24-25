package day2;

public class IfElseStatements {
    public static void main(String[] args) {
        // else is a part of an if statement
        // it is excecuted if the part above was not

        int x = (int)(Math.random() * 1000) + 1;
        // random number from 1 to 1000

        if (x % 2 == 0)
            System.out.println(x + " is even!");
        else 
            System.out.println(x + " is odd.");
        // if (x % 2 != 0)
        //     System.out.println(x + "is odd.");

        // this would work except it takes work to preform

        
    }
}
