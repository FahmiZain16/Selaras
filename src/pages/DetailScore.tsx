import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getScores, type PlayerScore } from "@/lib/storage";
import { ArrowLeft } from "lucide-react";

const DetailScore = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<PlayerScore[]>([]);

  useEffect(() => {
    setScores(getScores());
  }, []);

  const calculateRoundDisplay = (rounds: number[]) => {
    if (!rounds || rounds.length === 0) return "-";
    const redCount = rounds.filter((p) => p === 3).length;
    const whiteCount = rounds.filter((p) => p === 1).length;
    return `${redCount * 3}/${whiteCount}`;
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-4 overflow-x-auto">
      <div className="w-full max-w-4xl bg-background rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2 bg-[#FD7F42] rounded-2xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold text-foreground text-center">
            Detail Skor
          </h1>
          <p className="text-sm text-foreground/70 text-center mt-1">
            Rincian skor per rambahan
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="border border-foreground/20 p-2 sticky left-0 bg-primary z-10">
                  Peserta
                </th>
                {Array.from({ length: 20 }, (_, i) => (
                  <th key={i} className="border border-foreground/20 p-2 min-w-[50px]">
                    R{i + 1}
                  </th>
                ))}
                <th className="border border-foreground/20 p-2 font-bold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.map((player) => (
                <tr key={player.player} className="bg-card hover:bg-card/80">
                  <td className="border border-foreground/20 p-2 font-semibold sticky left-0 bg-card z-10">
                    {player.player}
                  </td>
                  {player.rounds.map((round, idx) => (
                    <td
                      key={idx}
                      className="border border-foreground/20 p-2 text-center"
                    >
                      {calculateRoundDisplay(round)}
                    </td>
                  ))}
                  <td className="border border-foreground/20 p-2 text-center font-bold text-primary">
                    {player.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-card rounded-lg border border-foreground/10">
          <p className="text-sm text-foreground/70 text-center">
            <strong>Format:</strong> X/Y → X = Poin Merah (3×merah) | Y = Jumlah Putih
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailScore;
