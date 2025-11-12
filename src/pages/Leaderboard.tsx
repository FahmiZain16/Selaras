import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLeaderboard, type PlayerScore } from "@/lib/storage";
import { Trophy } from "lucide-react";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<PlayerScore[]>([]);

  useEffect(() => {
    setScores(getLeaderboard());
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-mobile bg-background rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-sm text-foreground/70">Pertandingan Jemparingan</p>
        </div>

        <div className="space-y-4 mb-6">
          {scores.map((player, index) => (
            <Card key={player.player} className="p-4 bg-card border-2 border-foreground/10 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    index === 0 ? 'bg-primary text-primary-foreground' :
                    index === 1 ? 'bg-accent text-accent-foreground' :
                    index === 2 ? 'bg-destructive text-destructive-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground">{player.player}</p>
                    <p className="text-sm text-foreground/60">Peserta</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{player.total}</p>
                  <p className="text-xs text-foreground/60">poin</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => navigate("/rounds")} 
            className="w-full h-12 text-lg font-semibold"
            variant="default"
          >
            Input Skor
          </Button>
          <Button 
            onClick={() => navigate("/details")} 
            className="w-full h-12 text-lg font-semibold"
            variant="outline"
          >
            Detail Skor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
