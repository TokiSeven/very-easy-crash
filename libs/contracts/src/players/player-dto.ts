export interface PlayerDTO {
  id: string;
  name: string;
  bet: number;
  guessedNumber: number;
  cashout: number | null;
}
