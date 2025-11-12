export interface PlayerScore {
  player: string;
  total: number;
  rounds: number[][];
}

export function getScores(): PlayerScore[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem("scores");
  if (!data) {
    const init = Array.from({ length: 10 }, (_, i) => ({
      player: `P${String(i + 1).padStart(2, "0")}`,
      total: 0,
      rounds: Array(20).fill(null).map(() => []),
    }));
    localStorage.setItem("scores", JSON.stringify(init));
    return init;
  }
  return JSON.parse(data);
}

export function updateScore(player: string, roundIndex: number, newPoints: number[]) {
  const scores = getScores();
  const target = scores.find((p) => p.player === player);
  if (target) {
    target.rounds[roundIndex] = [...(target.rounds[roundIndex] || []), ...newPoints];
    target.total = scoresSum(target.rounds);
  }
  localStorage.setItem("scores", JSON.stringify(scores));
}

function scoresSum(rounds: number[][]): number {
  return rounds.flat().reduce((a, b) => a + b, 0);
}

export function getLeaderboard(): PlayerScore[] {
  const scores = getScores();
  return scores.sort((a, b) => b.total - a.total);
}
