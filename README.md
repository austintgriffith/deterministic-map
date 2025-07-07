# Deterministic Map Generator

A deterministic map generation system that creates game maps based on cryptographic hashes. This system uses a reveal hash to generate consistent, reproducible maps for games.

## Features

- **Deterministic Generation**: Same input always produces the same output
- **Cryptographic Entropy**: Uses SHA-256 hashing for unpredictable but reproducible randomness
- **Modular Design**: Separate classes for dice, land generation, and player positioning
- **Extensible**: Easy to add new land types and generation rules

## Project Structure

```
deterministic-map/
├── src/
│   ├── index.js                    # Main exports
│   ├── dice.js                     # DeterministicDice class
│   ├── gameLandGenerator.js        # GameLandGenerator class
│   └── playerPositionGenerator.js  # PlayerPositionGenerator class
├── example/
│   └── generateMap.js              # Example usage script
├── reveal_sample.txt               # Sample reveal hash
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## Classes

### DeterministicDice

Generates deterministic random numbers based on a cryptographic hash.

- **Constructor**: Takes a reveal hash as entropy source
- **roll(count)**: Generates random numbers using hex characters
- **rehashEntropy()**: Extends entropy by hashing when needed

### GameLandGenerator

Generates game maps with different land types.

- **generateLand()**: Creates a grid of land tiles
- **placeStartingPosition()**: Places treasure location
- **saveMapToFile()**: Saves map data to JSON file
- **printMapSummary()**: Displays land type statistics

### PlayerPositionGenerator

Generates deterministic starting positions for players.

- **generateStartingPosition()**: Creates position for single player
- **generateAllPlayerPositions()**: Creates positions for multiple players

## Usage

### Basic Example

```javascript
import { DeterministicDice, GameLandGenerator } from "./src/index.js";

// Create dice with reveal hash
const dice = new DeterministicDice("0x1234567890abcdef...");

// Generate 20x20 map
const generator = new GameLandGenerator(dice, 20);
generator.generateLand();
generator.placeStartingPosition();
generator.saveMapToFile("my_map.txt");
```

### Command Line Usage

```bash
# Generate map for game ID "sample"
node example/generateMap.js sample

# Or with explicit parameter
node example/generateMap.js --gameId=sample
```

This requires a file named `reveal_sample.txt` containing the reveal hash.

## Land Types

- **Type 1**: Common land (probability: 11/16)
- **Type 2**: Uncommon land (probability: 4/16)
- **Type 3**: Rare land (probability: 1/16)
- **Type X**: Treasure/starting position

## Installation

```bash
npm install
```

## Dependencies

- Node.js (ES modules support)
- Built-in `crypto` module for hashing
- Built-in `fs` module for file operations

## Testing

Use the provided `reveal_sample.txt` file to test the system:

```bash
node example/generateMap.js sample
```

This will generate a `map_sample.txt` file with the deterministic map data.
