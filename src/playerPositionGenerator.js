import crypto from "crypto";

class PlayerPositionGenerator {
  constructor(randomSeed) {
    this.randomSeed = randomSeed;
  }

  generateStartingPosition(playerAddress, gameId, mapSize) {
    // Combine random seed, player address, and game ID for deterministic positioning
    const combined =
      this.randomSeed + playerAddress.toLowerCase() + gameId.toString();

    // Create hash for deterministic coordinates
    const hash = crypto.createHash("sha256").update(combined).digest("hex");

    // Use first 8 hex chars for x, next 8 for y
    const xHex = hash.substring(0, 8);
    const yHex = hash.substring(8, 16);

    // Convert to coordinates within map bounds
    const x = parseInt(xHex, 16) % mapSize;
    const y = parseInt(yHex, 16) % mapSize;

    console.log(
      `Generated starting position for ${playerAddress}: (${x}, ${y})`
    );

    return { x, y };
  }

  generateAllPlayerPositions(playerAddresses, gameId, mapSize) {
    const positions = new Map();

    playerAddresses.forEach((playerAddress) => {
      const position = this.generateStartingPosition(
        playerAddress,
        gameId,
        mapSize
      );
      positions.set(playerAddress.toLowerCase(), position);
    });

    console.log(`Generated ${positions.size} player starting positions`);
    return positions;
  }
}

export default PlayerPositionGenerator;
