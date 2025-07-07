import fs from "fs";
import { DeterministicDice, GameLandGenerator } from "../src/index.js";

// Main game script
function main() {
  try {
    console.log("🎮 Starting Game Land Generator...\n");

    // Parse command line arguments
    const args = process.argv.slice(2);
    const gameIdArg = args.find((arg) => arg.startsWith("--gameId="));
    const gameId = gameIdArg ? gameIdArg.split("=")[1] : args[0];

    if (!gameId) {
      console.error("❌ Game ID is required");
      console.log("Usage: node generateMap.js <gameId>");
      console.log("   or: node generateMap.js --gameId=<gameId>");
      process.exit(1);
    }

    console.log(`🎮 Generating map for Game ID: ${gameId}`);

    // Read the reveal hash
    const revealHash = fs.readFileSync(`reveal_${gameId}.txt`, "utf8").trim();
    console.log(`Read reveal hash: ${revealHash}`);

    // Initialize deterministic dice
    const dice = new DeterministicDice(revealHash);

    // Test the dice system
    console.log("\n🎲 Testing dice system:");
    for (let i = 0; i < 5; i++) {
      console.log(`Roll ${i + 1}: ${dice.roll(1)}`);
    }

    // Reset dice for actual generation
    const gameGenerator = new GameLandGenerator(
      new DeterministicDice(revealHash)
    );

    // Generate the land
    gameGenerator.generateLand();

    // Place starting position
    gameGenerator.placeStartingPosition();

    // Print summary
    gameGenerator.printMapSummary();

    // Save to file
    gameGenerator.saveMapToFile(`map_${gameId}.txt`);

    console.log(`\n✅ Game land generation complete for game ${gameId}!`);
    console.log(`Check map_${gameId}.txt for the generated map data.`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.message.includes("ENOENT") && error.message.includes("reveal_")) {
      console.log(
        "💡 Make sure reveal_<gameId>.txt exists (run commit.js first)"
      );
    }
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
