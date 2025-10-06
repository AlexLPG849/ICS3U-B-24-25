package day1;

public class Animal {
    private String name;

    public Animal(String name) {
        this.name = name;
        System.out.println("Animal constructor called for " + name);
    }

    public void eat() {
        System.out.println(name + " is eating.");
    }
}