import DeterministicDice from "./dice.js";

interface StartingPosition {
  x: number;
  y: number;
  originalLandType: number;
}

interface MapMetadata {
  generated: string;
  landTypes: {
    1: string;
    2: string;
    3: string;
    X: string;
  };
}

interface MapData {
  size: number;
  land: (number | "X")[][];
  startingPosition: StartingPosition;
  metadata: MapMetadata;
}

declare class GameLandGenerator {
  dice: DeterministicDice;
  land: (number | "X")[][];
  size: number;
  startingPosition?: StartingPosition;

  constructor(dice: DeterministicDice, size?: number);

  /**
   * Generate the land grid using the dice
   */
  generateLand(): void;

  /**
   * Place the starting position (X) on the map
   */
  placeStartingPosition(): void;

  /**
   * Save the map to a JSON file
   * @param filename Output filename (default: 'map.txt')
   */
  saveMapToFile(filename?: string): void;

  /**
   * Print a summary of the map contents to console
   */
  printMapSummary(): void;
}

export default GameLandGenerator;
