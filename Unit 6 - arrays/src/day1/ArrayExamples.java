package day1;

public class ArrayExamples {
    public static void main(String[] args) {
        // exampleOne();
        // exampleTwo();
        exampleThree();
    }
    private static void exampleThree(){
        int[] nums = new int[10];

        // for (int el : nums) {
        //     System.out.println(el);
        // }

        // no change because el is a copy of the next element (makes a copy of the primitive)
        // for (int el : nums) {
        //     el = (int)(Math.random() * 100) + 5; // starts at 5, 104 different numbers
        // }

        

        for (int i = 0; i < nums.length; i++) {
            nums[i] = (int)(Math.random() * 100) + 5;
        }

        for (int el : nums) {
            System.out.println(el);
        }

        // if you are modifying what you are iterating through or need the index
        // use a for loop
    }
    private static void exampleTwo() {
        double[] values = {5.32, 5.2, 6.4, -39.1};
        // for loop has access to index and can iterate many ways
        for (int i = 0; i < values.length; i++) {
            System.out.println(i + ": " + values[i]);
        }
        // a foreach loop does "for each value i will do this". iterates through the whole arrray starting at the beginning
        // no access to the index, only elements
        for (double val : values) {
            System.out.println(val);
        }
    }

    private static void exampleOne() {
        int[] nums = {7, 5, 4, 3, 1};

        // nums refers to an array
        // the array contains 5 elements

        // there are no methods for an array
        // the index starts at zero ends at 4 and length -1 for last index
        System.out.println("Length: " + nums.length);

        // length is a property giving the size of the array.

        System.out.println(nums[0]);
        System.out.println(nums[1]);
        System.out.println(nums[2]);
        System.out.println(nums[3]);
        System.out.println(nums[4]);
        System.out.println(nums[nums.length-1]);


    }
}
