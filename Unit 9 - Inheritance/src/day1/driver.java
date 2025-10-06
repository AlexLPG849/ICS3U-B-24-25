package day1;

public class driver {
    public static void main(String[] args) {
        Animal animal = new Animal("Ishaan");
        mammal mammal = new Mammal("Brandon", true);
        Dog dog = new Dog("Abraham", "Golden Retreiver");
        Bird bird = new Bird("Alex", true);
        Animal animal2 = new Dog("Steve", "Poodle");

        animal.eat();
        mammal.eat();
        mammal.walk();
        dog.bark();
        dog.eat();

        bird.eat();
        bird.fly();

        animal2.bark();

    }
}
