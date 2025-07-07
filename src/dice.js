import crypto from "crypto";

class DeterministicDice {
  constructor(revealHash) {
    // Strip 0x prefix and store as entropy
    this.entropy = revealHash.startsWith("0x")
      ? revealHash.slice(2)
      : revealHash;
    this.position = 0;
    console.log(`Initialized with entropy: ${this.entropy}`);
  }

  // Roll x dice (use x characters from entropy)
  roll(count = 1) {
    let result = 0;

    for (let i = 0; i < count; i++) {
      // Check if we need to rehash entropy
      if (this.position >= this.entropy.length) {
        console.log(`Rehashing entropy at position ${this.position}`);
        this.rehashEntropy();
      }

      // Get next hex character and convert to 0-15
      const hexChar = this.entropy[this.position];
      const value = parseInt(hexChar, 16);

      // For multiple dice, we'll combine them (this creates more variation)
      result = (result << 4) + value;
      this.position++;
    }

    return result;
  }

  rehashEntropy() {
    // Hash the current entropy to get new entropy
    const hash = crypto.createHash("sha256");
    hash.update(this.entropy);
    this.entropy = hash.digest("hex");
    this.position = 0;
    console.log(`New entropy: ${this.entropy}`);
  }
}

export default DeterministicDice;
