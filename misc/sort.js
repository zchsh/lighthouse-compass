/**
 * Sorts an array in ascending order.
 * Likely lots of potential improvment here in terms of performance,
 * but I wanted to try not using .sort() to get out of my comfort zone.
 */
function sort(array) {
  let sorted = [];
  for (var i = 0; i < array.length; i++) {
    const entryToAdd = array[i];
    // If there are no entries, add this one, and continue on
    if (sorted.length == 0) {
      sorted.push(entryToAdd);
      continue;
    }
    // Otherwise, find the index where we should insert the entry.
    // Note that we can safely assume the array is sorted.
    let newSorted = [];
    let inserted = false;
    for (var s = 0; s < sorted.length; s++) {
      // when we find an item greater than or equal to the entry,
      // insert the entry before it
      if (!inserted && entryToAdd < sorted[s]) {
        newSorted.push(entryToAdd);
        inserted = true;
      }
      // for all other entries, retain the original order
      newSorted.push(sorted[s]);
    }
    if (!inserted) {
      newSorted.push(entryToAdd);
    }

    // replace our old sorted array with the new one
    sorted = newSorted;
  }
  return sorted;
}
