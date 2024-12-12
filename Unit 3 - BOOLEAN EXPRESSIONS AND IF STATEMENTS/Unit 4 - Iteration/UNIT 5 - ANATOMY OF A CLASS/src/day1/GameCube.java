package day1;

public class GameCube {
    // non-static instance variables
    // also called attributes
    // they belong to the instance

    private int numSides; // give them a constructor
    private int topSide;

    public GameCube(){ // Constructor gives an object from GameCube and set the starting/inital state of the instance
    // will return a game cube
        numSides = 6;
        roll(); // takes no arguements and generates a random number from 1-6
    }
    // this refers to the instance variables because
    // this refers to this object or this instance
    // int numSides is just the arguemnt/parameter
    // this.numsides refers to the attribute numSides
    public GameCube(int numSides){
        this.numSides = numSides;
        roll();
    }

    public void roll(){
        topSide = (int)(Math.random()*numSides) + 1;
    }

    public int getTopSide(){
        return this.topSide;
    }



}
