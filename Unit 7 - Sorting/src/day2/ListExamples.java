package day2;

import java.util.ArrayList;

public class ListExamples {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<String>();
        names.add("Ishaan");
        names.add("Mani");
        names.add("Brandon");
        
        for (String name : names) {
            System.out.println(name);
        }

        ArrayList<Integer> numbers = new ArrayList<Integer> (); 
        numbers.add(7);
        numbers.add(12);

        for (Integer num : numbers) {
            System.out.println(num);
        }
        ArrayList stuff = new ArrayList();
        stuff.add(7);
        stuff.add("Happy");
        stuff.add(new Frog());

        ((Frog)stuff.get(1)).jump();
    }
}
