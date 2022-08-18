/**
 *
 * @param {"clean" | "dirty"[]} samples
 * @param {number} threshold
 * @returns {"Clean" | "Polluted"}
 */
function checkAir(samples, threshold) {
  // Set up count variables
  let cleanSampleCount = 0;
  let dirtySampleCount = 0;
  // Iterate over the samples, increasing counts
  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i];
    if (sample === "clean") {
      cleanSampleCount++;
    } else if (sample === "dirty") {
      dirtySampleCount++;
    }
  }
  // Calculate the percentage of dirty samples
  const totalSamples = samples.length;
  const percentDirty = (dirtySampleCount * 100.0) / totalSamples;
  // Determine if we're below the threshold
  const acceptablePercentDirty = threshold * 100.0;
  const passesCheck = percentDirty < acceptablePercentDirty;
  // Print out the check result
  const checkResult = passesCheck ? "Clean" : "Polluted";
  return checkResult;
}

console.log(
  checkAir(
    [
      "clean",
      "clean",
      "dirty",
      "clean",
      "dirty",
      "clean",
      "clean",
      "dirty",
      "clean",
      "dirty",
    ],
    0.3
  )
);

console.log(checkAir(["dirty", "dirty", "dirty", "dirty", "clean"], 0.25));

console.log(
  checkAir(["clean", "dirty", "clean", "dirty", "clean", "dirty", "clean"], 0.9)
);
