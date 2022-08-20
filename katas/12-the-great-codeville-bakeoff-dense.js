/**
 * Given an array and a value,
 * Return true if the value is found in the array, false otherwise.
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
 * A function that picks recipes to help two bakeries work together.
 *
 * We limit our search to two ingredient recipes. We want to find a recipe
 * that utilizes one ingredient from Bakery A and one from Bakery B.
 *
 * We've also been guaranteed that there will be exactly one match,
 * so we return early once we can find a match.
 */
const chooseRecipe = function (bakeryA, bakeryB, recipes) {
  // Iterate over recipes, looking for match.
  for (let r = 0; r < recipes.length; r++) {
    const { name, ingredients } = recipes[r];
    // For this recipe, we keep track of whether:
    // - we have all ingredients
    // - we have some ingredient from Bakery A
    // - we have some ingredient from Bakery B
    let hasAllIngredients = true;
    let includesBakeryA = false;
    let includesBakeryB = false;
    // Iterate over the ingredients in this recipe
    for (let i = 0; i < ingredients.length; i++) {
      const thisIngredient = ingredients[i];
      const hasThisFromA = arrayIncludes(bakeryA, thisIngredient);
      const hasThisFromB = arrayIncludes(bakeryB, thisIngredient);
      const hasThisIngredient = hasThisFromA || hasThisFromB;
      // Update our knowledge about this recipe
      includesBakeryA = includesBakeryA || hasThisFromA;
      includesBakeryB = includesBakeryB || hasThisFromB;
      hasAllIngredients = hasAllIngredients && hasThisIngredient;
      if (!hasAllIngredients) {
        // If we're missing ingredients, this is definitely not a match.
        // We can skip to the next recipe by breaking out of this loop.
        break;
      }
    }
    // A recipe is a match if it meets all our criteria
    const isMatch = includesBakeryA && includesBakeryB && hasAllIngredients;
    // If we found a match, return immediately.
    if (isMatch) {
      return name;
    }
  }
  // We've been reassured we'll always have at least one match,
  // so we shouldn't expect to get to this part of the code.
  // But, just in case we do...
  return "Dang it! No recipes found!";
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
