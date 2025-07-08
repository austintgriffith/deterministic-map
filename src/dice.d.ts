declare class DeterministicDice {
  entropy: string;
  position: number;

  constructor(randomHash: string);

  /**
   * Roll x dice (use x characters from entropy)
   * @param count Number of dice to roll (default: 1)
   * @returns Random number generated from entropy
   */
  roll(count?: number): number;

  /**
   * Rehash the current entropy to get new entropy
   */
  rehashEntropy(): void;
}

export default DeterministicDice;
