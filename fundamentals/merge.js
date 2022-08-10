/**
 * Merges two arrays, keeping the merged array sorted in ascending order.
 * The incoming arrays are expected to be sorted in ascending order.
 */
function merge(arrayA, arrayB) {
  const merged = [];
  let aIndex = 0;
  let bIndex = 0;
  while (aIndex < arrayA.length || bIndex < arrayB.length) {
    // We'll keep track of whether we should push the next elements
    let shouldPushA = false;
    let shouldPushB = false;
    // We're iterating over both arrays, but they may be different lengths,
    // so we may not have both A and B values to compare.
    const hasA = aIndex < arrayA.length;
    const hasB = bIndex < arrayB.length;
    const hasBoth = hasA && hasB;
    const aValue = hasA && arrayA[aIndex];
    const bValue = hasB && arrayB[bIndex];
    // We may be at the end of one array, in which case we need to finish
    // adding elements from the other array.
    if (hasBoth) {
      // If we have both values, we need to compare them.
      // If they're equal, we add them both.
      // Otherwise, we add the smallest value to the merged array, then move on.
      const shouldPushBoth = aValue == bValue;
      shouldPushA = shouldPushBoth || aValue < bValue;
      shouldPushB = shouldPushBoth || bValue < aValue;
    } else if (hasA) {
      // We're at the end of array A, need to all all the rest of the values.
      shouldPushA = true;
    } else if (hasB) {
      // We're at the end of array B, need to all all the rest of the values.
      shouldPushB = true;
    }
    // Push the values and increment the indices as needed.
    if (shouldPushA) {
      merged.push(aValue);
      aIndex++;
    }
    if (shouldPushB) {
      merged.push(bValue);
      bIndex++;
    }
  }

  // return the merged array
  return merged;
}

console.log(merge([4, 5, 6], [1, 2, 3, 4]), "=?", [1, 2, 3, 4, 4, 5, 6]);
console.log(merge([4], [2, 5, 8]), "=?", [2, 4, 5, 8]);
console.log(merge([1, 2, 6], []), "=?", [1, 2, 6]);
