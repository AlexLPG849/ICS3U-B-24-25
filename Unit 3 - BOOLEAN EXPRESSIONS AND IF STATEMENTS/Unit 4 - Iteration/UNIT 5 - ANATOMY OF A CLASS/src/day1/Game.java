package day1;

public class Game {
    public static void main(String[] args) {
        GameCube cube1 = new GameCube();
        GameCube cube2 = new GameCube();

       int numPairs = 0;
        for (int i = 0; i < 1000; i++) {
            cube1.roll();
            cube2.roll();

            if(cube1.getTopSide() == cube2.getTopSide())
                numPairs++;
        }
        System.out.println("Number of Pairs:" + numPairs);
    }
}
