interface Position {
  x: number;
  y: number;
}

declare class PlayerPositionGenerator {
  revealSeed: string;

  constructor(revealSeed: string);

  /**
   * Generate a deterministic starting position for a player
   * @param playerAddress Player's wallet address
   * @param gameId Game identifier (string or number)
   * @param mapSize Size of the map (square)
   * @returns Position object with x and y coordinates
   */
  generateStartingPosition(
    playerAddress: string,
    gameId: string | number,
    mapSize: number
  ): Position;

  /**
   * Generate starting positions for multiple players
   * @param playerAddresses Array of player wallet addresses
   * @param gameId Game identifier (string or number)
   * @param mapSize Size of the map (square)
   * @returns Map of player addresses to their positions
   */
  generateAllPlayerPositions(
    playerAddresses: string[],
    gameId: string | number,
    mapSize: number
  ): Map<string, Position>;
}

export default PlayerPositionGenerator;
