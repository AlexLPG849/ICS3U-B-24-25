package day2;

public class NestedForLoops {
    public static void main(String[] args) {
       // exampleOne();
       // createBox(4, 8);

    //    // createTriangle();
    //    // int height = 8;
    //    // createTriangle(height);
    //     int height = 8;
    //     createBackwardsTriangle(height);
        int width = 6;
        int height = 5;
        createEmptyBox(width, height);
        
                                 }
                                        
                    private static void createEmptyBox(int width, int height) {
                        for (int i = 0; i < width; i++) {
                            System.out.print("*");
                        }
                        System.out.println();
                        
                        for (int i = 0; i < height - 2; i++) {
                            System.out.print("*");
                            for (int j = 0; j < width - 2; j++) {
                                System.out.print(" ");
                                
                            }
                            System.out.println("*");
                            
                        }


                        for (int i = 0; i < width; i++) {
                            System.out.print("*");
                            
                        }
                        System.out.println();
            }
        
                    private static void createBackwardsTriangle(int height) {
            for (int i = 0; i < height; i++) {
                for (int k = 0; k < height-i-1; k++) {
                    System.out.print(" ");
                }
                for (int u = 0; u <= i; u++) {
                    System.out.print("*");
           }
            System.out.println("");                    
        }
                }
            
    

                       private static void createTriangle(int height) {
                    for (int h = 0; h < height; h++) {
                        for (int k = 0; k <= h ; k++) {
                            System.out.print("*");
                            
                        }
                        System.out.println();
                    }
               }
       
                   // *
            // **
            // ***
            // ****
            // *****
            private static void createTriangle() {
                for (int h = 0; h <= 5; h++) {
                    for (int k = 0; k < h ; k++) {
                        System.out.print("*");
                        
                    }
                    System.out.println();
                }
           }
       
       
               private static void createBox(int rows, int cols) {
            for (int r = 0; r < rows; r++) {
                for (int c = 0; c < cols; c++) {
                    System.out.print("*");
                }
                System.out.println();
            }
           }
       
       
           // create a box of starts with width of 7 and height of 3
    // *******
    // *******
    // *******
    private static void exampleOne() {

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 7; j++) {
                System.out.print("*");
            
        }
        System.out.println();
        }
    }
}