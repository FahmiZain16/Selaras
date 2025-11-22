import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateScore } from "@/lib/storage";
import { ArrowLeft, Target } from "lucide-react";

const InputScore = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [selectedArrow, setSelectedArrow] = useState<string>("");
  const [tempScore, setTempScore] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const players = Array.from(
    { length: 10 },
    (_, i) => `P${String(i + 1).padStart(2, "0")}`
  );
  const arrows = ["1", "2", "3", "4", "5", "6"];

  const handleScoreClick = (points: number) => {
    if (!selectedPlayer || !selectedArrow) {
      alert("Pilih pemain dan nomor panah terlebih dahulu!");
      return;
    }
    setTempScore((prev) => prev + points);
  };

  const handleSave = () => {
    if (!selectedPlayer || !selectedArrow || tempScore === 0) {
      alert("Lengkapi data terlebih dahulu!");
      return;
    }

    const roundIndex = parseInt(id || "1") - 1;
    updateScore(selectedPlayer, roundIndex, [tempScore]);
    setShowSuccess(true);
    setTempScore(0);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-mobile bg-background rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <Button
            onClick={() => navigate("/rounds")}
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              Input Rambahan {id}
            </h1>
          </div>
          <p className="text-sm text-foreground/70 text-center">
            Masukkan skor panah
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Pilih Pemain
            </label>
            <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Pilih pemain..." />
              </SelectTrigger>
              <SelectContent>
                {players.map((player) => (
                  <SelectItem key={player} value={player}>
                    {player}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nomor Panah
            </label>
            <Select value={selectedArrow} onValueChange={setSelectedArrow}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Pilih nomor panah..." />
              </SelectTrigger>
              <SelectContent>
                {arrows.map((arrow) => (
                  <SelectItem key={arrow} value={arrow}>
                    Panah {arrow}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className="p-4 bg-card border-2 border-primary/30">
            <p className="text-sm text-foreground/70 mb-1">Skor Sementara</p>
            <p className="text-3xl font-bold text-primary">{tempScore}</p>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => handleScoreClick(3)}
            variant="destructive"
            className="h-32 text-2xl font-bold"
          >
            MERAH
            <br />
            <span className="text-base">+3 Poin</span>
          </Button>
          <Button
            onClick={() => handleScoreClick(1)}
            variant="secondary"
            className="h-32 text-2xl font-bold"
          >
            PUTIH
            <br />
            <span className="text-base">+1 Poin</span>
          </Button>
        </div>

        <Button
          onClick={handleSave}
          className="w-full h-12 text-lg font-semibold"
          variant="default"
        >
          Simpan Skor
        </Button>

        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                🏹Berhasil Disimpan!🎯
              </DialogTitle>
              <DialogDescription className="text-center text-base text-black">
                Skor telah berhasil disimpan untuk {selectedPlayer}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <Button
                onClick={() => {
                  setShowSuccess(false);
                  setSelectedPlayer("");
                  setSelectedArrow("");
                }}
                className="bg-[#B32B1B] text-white hover text-base shadow-xl"
              >
                Input Lainnya
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="bg-[#FD7F42] text-white hover:bg-[#D9D9D9] text-base shadow-xl"
              >
                Kembali ke Beranda
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InputScore;
