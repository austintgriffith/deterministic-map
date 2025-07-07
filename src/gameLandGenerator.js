import fs from "fs";

class GameLandGenerator {
  constructor(dice, size = 20) {
    this.dice = dice;
    this.land = [];
    this.size = size;
  }

  generateLand() {
    console.log(`Generating ${this.size}x${this.size} land...`);

    // Initialize dynamic size array
    for (let y = 0; y < this.size; y++) {
      this.land[y] = [];
      for (let x = 0; x < this.size; x++) {
        // Roll one die (0-15)
        const roll = this.dice.roll(1);

        // Convert roll to land type
        let landType;
        if (roll <= 10) {
          landType = 1; // Common land (0-10)
        } else if (roll <= 14) {
          landType = 2; // Uncommon land (11-14)
        } else {
          landType = 3; // Rare land (15)
        }

        this.land[y][x] = landType;
      }
    }

    console.log("Land generation complete!");
  }

  placeStartingPosition() {
    // Roll 2 dice for x coordinate, mod size
    const x = this.dice.roll(2) % this.size;
    // Roll 2 dice for y coordinate, mod size
    const y = this.dice.roll(2) % this.size;

    console.log(`Placing starting position at (${x}, ${y})`);

    // Store original land type and place X
    this.startingPosition = { x, y, originalLandType: this.land[y][x] };
    this.land[y][x] = "X";
  }

  saveMapToFile(filename = "map.txt") {
    const mapData = {
      size: this.size,
      land: this.land,
      startingPosition: this.startingPosition,
      metadata: {
        generated: new Date().toISOString(),
        landTypes: {
          1: "Common",
          2: "Uncommon",
          3: "Rare",
          X: "Treasure!",
        },
      },
    };

    fs.writeFileSync(filename, JSON.stringify(mapData, null, 2));
    console.log(`Map saved to ${filename}`);
  }

  printMapSummary() {
    let counts = { 1: 0, 2: 0, 3: 0, X: 0 };

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        counts[this.land[y][x]]++;
      }
    }

    console.log("\nMap Summary:");
    console.log(`Common land (1): ${counts[1]} tiles`);
    console.log(`Uncommon land (2): ${counts[2]} tiles`);
    console.log(`Rare land (3): ${counts[3]} tiles`);
    console.log(`Starting position (X): ${counts["X"]} tile`);
    console.log(
      `Total: ${counts[1] + counts[2] + counts[3] + counts["X"]} tiles`
    );
  }
}

export default GameLandGenerator;
