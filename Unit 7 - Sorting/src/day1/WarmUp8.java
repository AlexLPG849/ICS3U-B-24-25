package day1;

public class WarmUp8 {
    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 67 };

        // locate the smallest number (index)

        int minIndex = getSmallestIndex(arr);

            System.out.println(minIndex);
    }

        private static int getSmallestIndex(int[] arr){
            int minIndex = 0;

            for (int i = 1; i < arr.length; i++) {
                if(arr[i] < arr[minIndex])
                    minIndex = i;
            }
            return minIndex;
        }
    }
