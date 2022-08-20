/**
 * Given an array and a value,
 * Return true if the value is found in the array..
 *
 * Note: we do not traverse the whole array,
 * we exit early if we find a value.
 *
 * @param {any[]} array
 * @param {any} value
 * @returns {boolean}
 */
function arrayIncludes(array, value) {
  let isIncluded = false;
  for (let i = 0; i < array.length; i++) {
    if (value === array[i]) {
      isIncluded = true;
      break;
    }
  }
  return isIncluded;
}

/**
 * Given an array of string values, and a joinerString with which to join them,
 *
 * Return a single string consisting of the strings in the array joined
 * together with the joinerString between each.
 *
 * @param {string[]} arrayOfStrings
 * @param {string} joinerString
 * @returns {string}
 */
function arrayJoin(arrayOfStrings, joinerString) {
  // Set up a string to hold our work as we go
  let joinedString = "";
  for (let i = 0; i < arrayOfStrings.length; i++) {
    // Add each string from the array, one by one
    joinedString += arrayOfStrings[i];
    // Only add the joinerString if there's another string to join after it
    if (i < arrayOfStrings.length - 1) {
      joinedString += joinerString;
    }
  }
  // Return the joined string
  return joinedString;
}

/**
 * A function that picks recipes to help two bakeries work together.
 *
 * We limit our search to two ingredient recipes. We want to find a recipe
 * that utilizes one ingredient from Bakery A and one from Bakery B.
 *
 * @param {string[]} bakeryA Ingredients in stock at Bakery A.
 * @param {string[]} bakeryB Ingredients in stock at Bakery A.
 * @param {{ name: string, ingredients: string[] }} recipes A list of recipes. Note that each recipe has at least two ingredients.
 * @return {string} The name of a single correct recipe.
 */
const chooseRecipe = function (bakeryA, bakeryB, recipes) {
  const matchedRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const { name, ingredients } = recipes[i];
    /**
     * We keep track of whether we have some source for every single ingredient.
     *
     * We start with true, since we have no ingredients so far, so don't have
     * to worry about sources yet.
     */
    let hasAllIngredients = true;
    /**
     * We keep track of whether we've found some ingredient from A or B.
     * Note that we do manage to handle special cases with this approach:
     *
     * - if NEITHER bakery has an ingredient, we'll know from
     *   hasAllIngredients. So we don't have to worry about this case.
     *
     * - if BOTH bakeries have a particular ingredient, that's fine.
     *   if we had recipes with only one ingredient, and both bakeries had
     *   that ingredient, the bakeries might have to fight about who gets to
     *   supply it. But, we know there are always at least two ingredients.
     *   So we don't have to worry about overlap.
     *
     * We start with false, since we haven't found any ingredients yet.
     */
    let hasSomeIngredientFromA = false;
    let hasSomeIngredientFromB = false;
    for (let n = 0; n < ingredients.length; n++) {
      const ingredient = ingredients[n];
      const hasThisFromA = arrayIncludes(bakeryA, ingredient);
      const hasThisFromB = arrayIncludes(bakeryB, ingredient);
      const hasThisIngredient = hasThisFromA || hasThisFromB;
      /**
       * hasIngredientFrom(X) is true if EITHER of these conditions is met:
       * - hasIngredientFrom(X) was already true, which means we found some
       *   previous ingredient from (X)
       * - hasThisFrom(X) is true, which means we found this ingredient from (X)
       */
      hasSomeIngredientFromA = hasSomeIngredientFromA || hasThisFromA;
      hasSomeIngredientFromB = hasSomeIngredientFromB || hasThisFromB;
      /**
       * hasAllIngredients is true only if BOTH these conditions are met:
       * - hasAllIngredients was already true, which means we've found
       *   sources for all previous ingredients, AND
       * - hasThisIngredient is true, which means we have this ingredient too
       */
      hasAllIngredients = hasAllIngredients && hasThisIngredient;
    }
    /**
     * A recipe is a match if:
     * - it hasAllIngredients
     * - it hasSomeIngredientFromA
     * - it hasSomeIngredientFromB
     */
    const isMatch =
      hasSomeIngredientFromA && hasSomeIngredientFromB && hasAllIngredients;
    /**
     * If we found a match, add it to the list of matches.
     *
     * If we wanted to be efficient and only return the first
     * match, we could break out of the loop here. But I like being thorough.
     */
    if (isMatch) {
      matchedRecipes.push(name);
    }
  }
  // We've been reassured we'll always have a match, but just in case...
  if (matchedRecipes.length === 0) {
    return "Dang it! No recipes found!";
  }
  // We've been reassured there will be exactly one match, but just in case...
  if (matchedRecipes.length > 1) {
    return "Whoa! More than one recipe found!";
  }
  // Otherwise, we have exactly one match.
  return matchedRecipes[0];
};

let bakeryA = ["saffron", "eggs", "tomato paste", "coconut", "custard"];
let bakeryB = ["milk", "butter", "cream cheese"];
let recipes = [
  {
    name: "Coconut Sponge Cake",
    ingredients: ["coconut", "cake base"],
  },
  {
    name: "Persian Cheesecake",
    ingredients: ["saffron", "cream cheese"],
  },
  {
    name: "Custard Surprise",
    ingredients: ["custard", "ground beef"],
  },
];

console.log(chooseRecipe(bakeryA, bakeryB, recipes));

bakeryA = ["potatoes", "bay leaf", "raisins"];
bakeryB = ["red bean", "dijon mustard", "apples"];
recipes = [
  {
    name: "Potato Ganache",
    ingredients: ["potatoes", "chocolate"],
  },
  {
    name: "Sweet Fish",
    ingredients: ["anchovies", "honey"],
  },
  {
    name: "Nima's Famous Dijon Raisins",
    ingredients: ["dijon mustard", "raisins"],
  },
];

console.log(chooseRecipe(bakeryA, bakeryB, recipes));
