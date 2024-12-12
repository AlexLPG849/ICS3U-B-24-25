package day4;

import day2.Student;

public class quiz {
    public static void main(String[] args) {
        Teacher mrSmith = new Teacher("Mr. Smith", "Math", 10);
        Student john = new Student("John", 85, 95.0);
        Student jane = new Student("Jane", 90, 98.0);
        Course mathCourse = new Course("Algebra", mrSmith, john, jane);
        mathCourse.startClass();
        mrSmith.assignGrade(john, 85);
        mrSmith.assignGrade(jane, 90);
        john.attendClass();
        jane.attendClass();
        mathCourse.printCourseRoster();
        boolean johnGraduation = john.Graduate();
        boolean janeGraduaton = jane.Graduate();
            getAverage(john, jane);
            System.out.println("John can graduate" + johnGraduation);
            System.out.println("John can graduate" + janeGraduaton);
        }
    }