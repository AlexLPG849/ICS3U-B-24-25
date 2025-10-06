package day2;

public class LEDStrip {
    // Constant array representing available patterns
    public static final String[] AVAILABLE_PATTERNS = { "random", "alternate", "red", "yellow", "green", "blue" };

    // Attributes of the LEDStrip class
    private LEd[] leds;
    private String pattern;

    // Constructor stub to accept pattern and the number of LEDs in the strip
    public LEDStrip(String pattern, int numLEDs) {
        this.leds = new LEd[numLEDs];
        setPattern(pattern);
    }

    // Method stub to count and return the number of LEDs that are not on
    public int countOffLEDs() {
        int numOff = 0;
        for (LEd led : leds) {
            if (!led.isOn())
                numOff++;
        }

        return numOff;
    }

    // Method stub to count and return the number of LEDs that are of a particular
    // colour
    public int countColourLEDs(String colour) {
        int numColour = 0;
        for (LEd led : leds) {
            if (!led.getColour().equals(colour))
                numColour++;
        }

        return numColour;
    }

    // Getter and setter stub to change the pattern
    public String getPattern() {
        return this.pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
        int maxIndex = LEd.AVAILABLE_COLOURS.length;
        int currentIndex = 0;
        for (int i = 0; i < leds.length; i++) {
            if (pattern.equals("red")) {
                leds[i] = new LEd("RED");
            } else if (pattern.equals("blue")) {
                leds[i] = new LEd("BLUE");
            } else if (pattern.equals("yellow")) {
                leds[i] = new LEd("YELLOW");
            } else if (pattern.equals("green")) {
                leds[i] = new LEd("GREEN");
            } else if (pattern.equals("random")) {
                String randomColour = LEd.AVAILABLE_COLOURS[(int) (Math.random() * LEd.AVAILABLE_COLOURS.length)];
                leds[i] = new LEd(randomColour);
            } else {
                
                leds[i] = new LEd(LEd.AVAILABLE_COLOURS[currentIndex]);
                currentIndex++;
                if (currentIndex > maxIndex)
                    currentIndex = 0;
            }
        }
    }

    public void display() {
        for (LEd led : leds) {
            led.displayColour();
        }
    }

    public void turnOnLEDs(){
        for (LEd led : leds) {
            led.setOn(true);
        }
    }

    public void turnOffLEDs(){
        for (LEd led : leds) {
            led.setOn(false);
        }
    }
}