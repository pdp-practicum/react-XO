import { IEntity } from "./types";

export const Mini = ({ id, player1, player2, winner, max }: IEntity.Game.Main): IEntity.Game.Mini => ({
  id,
  player1: player1.name,
  player2: player2.name,
  winner,
  max
});
