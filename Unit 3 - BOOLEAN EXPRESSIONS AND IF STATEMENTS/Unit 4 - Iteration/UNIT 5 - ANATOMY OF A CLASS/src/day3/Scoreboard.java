package day3;

public class Scoreboard {
    private String team1;
    private String team2;
    private int score1;
    private int score2;
    private boolean isTeam1Active;

    public Scoreboard(String team1, String team2) {
        this.team1 = team1;
        this.team2 = team2;
        score1 = 0;
        score2 = 0;
        isTeam1Active = true;
    }

    public void recordPlay(int points) {
        if (points > 0) {
            if (isTeam1Active) {
                score1 += points;
            } else {
                score2 += points;
            }
        } else {
            isTeam1Active = !isTeam1Active;
        }
    }

    public String getScore() {
        if (isTeam1Active)
            return score1 + "-" + score2 + "-" + team1;
        else   
            return score1 + "-" + score2 + "-" + team2;
    }
}
