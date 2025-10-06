package day2;

public class SearchingAlgorithmsB {
    public static void main(String[] args) {
        int[] arr = new int[25];

        populateArr(arr, 1, 100);

        print(arr);

        //int index = linearSearch(arr, 23);
        //System.out.println(index);

        int index = binarySearch(arr, 23);
                System.out.println(index);
                            }
                                
                    private static int binarySearch(int[] arr, int findMe) {
                        int min = 0, max = arr.length-1;
                        int mid = (min+max) /2;

                        while(min < max)
                        if (arr[mid == findMe])
                            return mid;
                        else if(arr[mid] > findMe)
                            max = mid-1;
                        else
                            min = mid+1;
            }
        
            //                         private static int linearSearch(int[] arr, int findMe) {
            //     for (int i = 0; i < arr.length; i++) {
            //         if(arr[i] == findMe)
            //             return i;
            //     }
            //     return -1;
            // }
        
                            private static void print(int[] arr) {
                for (int el : arr) {
                    System.out.print(el + " ");
                }
            }
        
                    private static void populateArr(int[] arr, int min, int max) {
                for (int i = 0; i < arr.length; i++) {
                    arr[i] = (int)(Math.random()*(max-min+1)) + min;
        }
    }
}
