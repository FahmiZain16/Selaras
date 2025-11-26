import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const SelectRound = () => {
  const navigate = useNavigate();
  const rounds = Array.from({ length: 20 }, (_, i) => i + 1);
  const [completed, setCompleted] = useState<number[]>([]);
  useEffect(() => {
    const done = rounds.filter((r) =>  localStorage.getItem(`round-${r}`) === "done");
    setCompleted(done);
  }, [rounds]);  

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-mobile bg-[#2A1617] rounded-3xl shadow-lg p-6">
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
          <h1 className="text-2xl font-bold text-white text-center">
            Pilih Rambahan
          </h1>
          <p className="text-sm text-white/70 text-center">
            Pilih rambahan untuk input skor
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {rounds.map((round) => (
            <Button
              key={round}
              onClick={() => navigate(`/input/${round}`)}
              variant="default"
              className={`h-16 text-base font-semibold ${
              completed.includes(round)
              ? "bg-[#FD7F42] text-white hover:bg-[#7A4B47] hover:text-white"
              : "bg-gray-200 text-black hover:bg-[#7A4B47] hover:text-white"
              }`}
            >
              {round}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectRound;
