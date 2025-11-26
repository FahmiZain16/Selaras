import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getScores, type PlayerScore } from "@/lib/storage";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const DetailScore = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<PlayerScore[]>([]);

  // 1. SETUP STATE & REF UNTUK SCROLL
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setScores(getScores());
  }, []);
  // 2. FUNGSI: Saat Slider Digeser -> Tabel Ikut Gerak
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setScrollProgress(value);

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = (value / 100) * maxScroll;
    }
  };

  // 3. FUNGSI: Saat Tabel Di-Swipe (Touch) -> Slider Ikut Gerak
  const handleContainerScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (maxScroll > 0) {
        const progress = (scrollLeft / maxScroll) * 100;
        setScrollProgress(progress);
      }
    }
  };
  const calculateRoundDisplay = (rounds: number[]) => {
    if (!rounds || rounds.length === 0) return "-";
    const redCount = rounds.filter((p) => p === 3).length;
    const whiteCount = rounds.filter((p) => p === 1).length;
    return `${redCount * 3}/${whiteCount}`;
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center overflow-x-auto">
      <div className="w-full max-w-md bg-[#2A1617] shadow-lg pl-6 py-6">
        <div className="mb-2">
          <Button
            onClick={() => navigate("/")}
            size="sm"
            className="mb-4 -ml-2 bg-primary hover:bg-orange-600 text-[#2A1617]"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-[#2A1617]" />
            Back
          </Button>

          {/* Header */}
          <h1 className="text-lg font-semibold text-white">
            Leaderboard Jemparingan Mataraman Pelajar
          </h1>
        </div>

        {/* Container Jumlah Peserta*/}
        <div className="pr-6">
          <div className="bg-primary w-full p-3 rounded-xl text-center font-semibold text-[#2A1617] mb-2 shadow-md ">
            {scores.length} Peserta Terdaftar
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleContainerScroll}
          className="overflow-x-auto pb-2 mb-[5rem] [&::-webkit-scrollbar]:hidden"
        >
          <div className="w-max pr-6 min-w-full">
            {/* Container Utama (Kotak Oren) */}
            <div className="bg-primary rounded-xl pl-4 py-4 pr-0 overflow-hidden">
              <table className="w-full border-separate border-spacing-y-[6px] text-xs sm:text-sm pr-4">
                <thead>
                  <tr className="bg-primary text-[#2A1617]">
                    <th className="border border-primary p-2 sticky left-0 bg-primary z-10">
                      Peserta
                    </th>
                    {Array.from({ length: 20 }, (_, i) => (
                      <th
                        key={i}
                        className="border border-primary p-2 min-w-[50px]"
                      >
                        R{i + 1}
                      </th>
                    ))}
                    <th className="border border-primary p-2 font-bold">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((player) => (
                    <tr
                      key={player.player}
                      className="bg-white shadow-sm rounded-lg h-7"
                    >
                      <td className="p-1 font-bold text-[#2A1617] sticky left-0 bg-white z-10 rounded-l-lg shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                        {/* Detail */}
                        <div className="flex items-center gap-2">
                          <span className="bg-gray-200 text-[10px] px-1.5 py-0.5 rounded text-gray-600">
                            Detail
                          </span>
                          {player.player}
                        </div>
                      </td>

                      {/* Kolom Skor Ronde */}
                      {player.rounds.map((round, idx) => (
                        <td
                          key={idx}
                          className="p-2 text-center font-medium text-gray-700 border-l border-gray-100"
                        >
                          {calculateRoundDisplay(round)}
                        </td>
                      ))}
                      <td className="p-2 text-center font-bold text-[#2A1617] border-l border-gray-100 rounded-r-lg bg-gray-50/50">
                        {(player as any).total !== undefined
                          ? (player as any).total
                          : player.rounds.reduce(
                              (a, b) => a + (typeof b === "number" ? b : 0),
                              0
                            )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scrollbar Custom*/}
            <div className="pr-6 mt-1 flex items-center gap-2">
              <ChevronLeft size={16} className="text-white" />
              <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scrollProgress}
                  onChange={handleSliderChange}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                />

                <div
                  className="h-full bg-white rounded-full transition-all duration-75 ease-out"
                  style={{
                    width: "30%",
                    transform: `translateX(${
                      scrollProgress * (100 / 30) * 0.7
                    }%)`,
                  }}
                />
              </div>

              <ChevronRight size={16} className="text-white/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailScore;