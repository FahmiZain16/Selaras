import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLeaderboard, type PlayerScore } from "@/lib/storage";
import { Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<PlayerScore[]>([]);

  useEffect(() => {
    setScores(getLeaderboard());
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-[#2A1617] rounded-lg p-6">

        /*kembali & amplop */
        <div className="flex justify-between items-center w-full px-2">
          <Button
            onClick={() => navigate("/rounds")}
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2 bg-[#FD7F42] rounded-2xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2 " />
            Kembali
          </Button>
          
          <div className="mb-4 bg-white rounded-xl w-10 h-10 flex items-center justify-center shadow-sm">
            <Mail className="w-6 h-6 text-black" />
          </div>
        </div>


        /*input skor*/
        <div className="mb-5">
           <Button 
            onClick={() => navigate("/rounds")} 
            className="w-full h-15 text-xl font-bold bg-[#D9D9D9] hover:bg-[#c4c4c4] text-[#2A1617] rounded-2xl shadow-lg"
          >
            Input Skor
          </Button>
        </div>

        {/* --- Section Title & Detail Button --- */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-[#D9D9D9] text-xl font-bold">Leaderboard Peserta</h2>
          <Button 
            onClick={() => navigate("/details")} 
            size="sm"
            className="bg-[#FD7F42] text-black font-bold h-8 rounded-lg gap-1"
          >
            Detail
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </Button>
        </div>

        {/* --- List Container (Gradient Background) --- */}
        <div className="bg-gradient-to-b from-[#4E170D] to-[#B4341F] rounded-[2rem] p-4 pb-10 flex-1 shadow-2xl border-t border-[#6B241A]">
          <div className="space-y-3 mt-2">
            {scores.map((player, index) => (
              /* Menggunakan komponen Card asli kamu, tapi distyle jadi kapsul */
              <Card 
                key={index} 
                className="p-0 bg-[#FFFB97] border-none rounded-full h-12 flex items-center shadow-md hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-center justify-between w-full px-1.5">
                  <div className="flex items-center gap-4">
                    {/* Lingkaran Nomor */}
                    <div className="w-9 h-9 rounded-full bg-[linear-gradient(180deg,rgba(254,127,66,0.5)_25%,rgba(217,86,46,0.75)_50%,#B32C1A_100%)] border-2 border-[#8B2E18] flex items-center justify-center text-[#1a0f0f] font-bold text-sm shadow-inner shrink-0">
                      {index + 1}
                    </div>
                    {/* Nama Player */}
                    <div className="font-bold text-base text-[#1a0f0f]">
                      {player.player}
                    </div>
                  </div>
                  
                  {/* Total Skor */}
                  <div className="text-base font-bold text-[#1a0f0f] mr-4">
                    {player.total}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
