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
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const players = Array.from(
    { length: 10 },
    (_, i) => `P${String(i + 1).padStart(2, "0")}`
  );
  const arrows = ["1", "2", "3", "4", "5", "6"];

  const handleScoreClick = (points: number) => {
    if (!selectedPlayer || !selectedArrow) {
      setErrorMessage("Pilih pemain dan nomor panah terlebih dahulu!");
      return;
    }
    setErrorMessage("");
    setSelectedScore(points);
  };

  const handleSave = () => {
    if (!selectedPlayer || !selectedArrow || selectedScore === null) {
      setErrorMessage("Lengkapi data terlebih dahulu!");
      return;
    }

    setErrorMessage("");
    const roundIndex = parseInt(id || "1") - 1;
    updateScore(selectedPlayer, roundIndex, [selectedScore]);
    localStorage.setItem(`round-${id}`, "done");
    setShowSuccess(true);
    setSelectedScore(null);
  };

  return (
    <div className="min-h-screen bg-[#2A1617] flex items-center justify-center">
      <div className="w-full max-w-mobile bg-[#2A1617] shadow-lg p-6">
        <div className="mb-6">
          <Button
            onClick={() => navigate("/rounds")}
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2 bg-[#FD7F42] rounded-2xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-white">
              Input Rambahan {id}
            </h1>
          </div>
          <p className="text-sm text-white/70 text-center">
            Masukkan skor panah
          </p>
        </div>

        <div className="space-y-4 mb-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Pilih Pemain
              </label>
              <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                <SelectTrigger className="w-full border-none text-white rounded-2xl" style={{ backgroundColor: '#7B4B47' }}>
                  <SelectValue placeholder="Pilih pemain..." className="text-white" />
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
              <label className="block text-sm font-medium text-white mb-2">
                Nomor Panah
              </label>
              <Select value={selectedArrow} onValueChange={setSelectedArrow}>
                <SelectTrigger className="w-full border-none text-white rounded-2xl" style={{ backgroundColor: '#7B4B47' }}>
                  <SelectValue placeholder="Pilih nomor panah..." className="text-white" />
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
          </div>

          <Card 
            className="p-4 border-2 text-center rounded-2xl" 
            style={{ 
              backgroundColor: 'rgba(118, 68, 61, 0.15)', 
              borderColor: '#593A35' 
            }}
          >
            <p className="text-sm text-white mb-1">Skor Terpilih</p>
            <p className="text-3xl font-bold text-white">
              {selectedScore === null ? "-" : selectedScore}
            </p>
          </Card>
        </div>

        {errorMessage && (
          // <div 
          //   className="mb-4 p-3 rounded-2xl text-center text-sm font-medium"
          //   style={{ backgroundColor: '#FFFB97', color: '#2A1617' }}
          // >
          //   {errorMessage}
          // </div>
          <p className="text-[#fffb97] pb-2 text-center">
            {errorMessage}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 my-6">
          <Button
            onClick={() => handleScoreClick(3)}
            className={`py-8 text-2xl font-bold text-white relative overflow-hidden transition-all rounded-3xl ${
              selectedScore === 3
                ? "ring-4 scale-105 shadow-2xl"
                : "ring-2 ring-transparent hover:scale-102"
            }`}
            style={{
              background: "linear-gradient(135deg, #4D120C 0%, #B32B1B 100%)",
              ...(selectedScore === 3 && {
                boxShadow: "0 0 0 4px rgba(255, 227, 227, 0.5)",
              }),
            }}
          >
            {selectedScore === 3 && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-[#FFE3E3] rounded-full flex items-center justify-center">
                <span className="text-black text-xs">✓</span>
              </div>
            )}
            Merah
            <br />
          </Button>
          <Button
            onClick={() => handleScoreClick(1)}
            className={`py-8 text-2xl font-bold text-gray-800 relative overflow-hidden transition-all rounded-3xl ${
              selectedScore === 1
                ? "ring-4 scale-105 shadow-2xl"
                : "ring-2 ring-transparent hover:scale-102"
            }`}
            style={{
              background: "linear-gradient(135deg, #999999 0%, #FFFFFF 100%)",
              ...(selectedScore === 1 && {
                boxShadow: "0 0 0 4px rgba(255, 227, 227, 0.5)",
              }),
            }}
          >
            {selectedScore === 1 && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-[#FFE3E3] rounded-full flex items-center justify-center">
                <span className="text-black text-xs">✓</span>
              </div>
            )}
            Putih
            <br />
          </Button>
        </div>

        <Button
          onClick={handleSave}
          className="w-full h-12 text-lg font-semibold rounded-2xl"
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
                  setSelectedScore(null);
                }}
                className="bg-[#B32B1B] text-white hover text-base shadow-xl rounded-2xl"
              >
                Input Lainnya
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="bg-[#FD7F42] text-white hover:bg-[#D9D9D9] text-base shadow-xl rounded-2xl"
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
