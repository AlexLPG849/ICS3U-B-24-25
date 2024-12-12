package day2;

public class Car {
    private String brand;
    private String model;
    private int year;
    private double mileage;

    public Car(String brand, String model, int year, double mileage) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.mileage = mileage;

        
    }
    public String getBrand(){
        return brand;
    }
    public void setBrand(String brand){
        this.brand = brand;
    }
    public String getModel(){
        return model;
    }
    public void setModel(String model){
        this.model = model;
    }
    public int getYear(){
        return year;
    }
    public void setYear(int year){
        this.year = year;
    }
    public double getMileage(){
        return mileage;
    }
    public void setMileage(double mileage){
        this.mileage = mileage;
    }
    public void displayCarDetails() {
        System.out.println("Car Details:");
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("Mileage: " + mileage + " miles");
    }

    public void drive(double milesDriven) {
        mileage += milesDriven;
        System.out.println("You drove " + milesDriven + " miles.");        
    }
}