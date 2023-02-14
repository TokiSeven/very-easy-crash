import { FC } from 'react';

export const PlayerRow: FC<{
  name: string;
  bet: number;
  cashout: number | null;
  guessedNumber: number;
}> = ({ name, bet, cashout, guessedNumber }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{guessedNumber}</td>
      <td>{bet.toFixed(2)}</td>
      <td>
        {cashout === null || cashout === undefined ? 'N/A' : cashout.toFixed(2)}
      </td>
    </tr>
  );
};
