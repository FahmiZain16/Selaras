import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SelectRound = () => {
  const navigate = useNavigate();
  const rounds = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-mobile bg-background rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold text-foreground text-center">
            Pilih Rambahan
          </h1>
          <p className="text-sm text-foreground/70 text-center mt-1">
            Pilih rambahan untuk input skor
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {rounds.map((round) => (
            <Button
              key={round}
              onClick={() => navigate(`/input/${round}`)}
              variant="default"
              className="h-16 text-base font-semibold"
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
