/**
 *
 *
 * ARRAY UTILITIES
 * (could use built-ins instead, trying not to just because)
 *
 *
 */

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
 * Given an array of entries, and a `matchFunction`
 * that, given an entry, will return `true` if it
 * is a match or `false` otherwise,
 *
 * Return the first entry in the array that satisfied the `matchFunction`,
 * or `undefined` if no entries match.
 *
 * @param {any[]} array
 * @param {*} matchFunction
 * @returns
 */
function arrayFind(array, matchFunction) {
  for (let i = 0; i < array.length; i++) {
    if (matchFunction(array[i])) {
      return array[i];
    }
  }
  return undefined;
}

/**
 * Given an array of entries, and a `mapFunction`
 * that, given an entry and its index, will return some transformed value,
 *
 * Return the array of entries after each has been transformed
 * with `mapFunction`.
 *
 * @param {any[]} array
 * @param {*}mapFunction
 * @returns
 */
function arrayMap(array, mapFunction) {
  const mappedArray = [];
  for (let i = 0; i < array.length; i++) {
    mappedArray.push(mapFunction(array[i], i));
  }
  return mappedArray;
}

/**
 * Given an array of entries, and a `filterFunction`
 * that, given an entry and its index, will return `true` if the entry
 * should be kept in the array or `false` if it should be dropped,
 *
 * Return the array of filtered entries.
 *
 * @param {any[]} array
 * @param {*} filterFunction
 * @returns
 */
function arrayFilter(array, filterFunction) {
  const filteredArray = [];
  for (let i = 0; i < array.length; i++) {
    if (filterFunction(array[i], i)) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
}

/**
 *
 *
 *
 * SPECIFICS
 *
 *
 *
 */

/**
 * Given an array of ingredients,
 * and arrays of available ingredients at two bakeries,
 *
 * Return an array of ingredient objects with { ingredients, sources },
 * where `sources` is an array of bakery identifiers that have that ingredient.
 *
 * @param {string[]} ingredients
 * @param {{name: string, stock: string[]}[]} bakeries
 * @returns
 */
function addIngredientSources(ingredients, bakeries) {
  return arrayMap(ingredients, (ingredient) => {
    const sources = [];
    for (let j = 0; j < bakeries.length; j++) {
      const bakery = bakeries[j];
      if (arrayIncludes(bakery.stock, ingredient)) {
        sources.push(bakery.name);
      }
    }
    return {
      name: ingredient,
      sources,
    };
  });
}

/**
 * Given an array of bakeries, each with a .stock of ingredients,
 * and an array of ingredients needed for a recipe,
 *
 * Return the array of bakeries, each with a new .matchedIngredients
 * property, which contains any ingredients from the recipe that
 * the bakery has in stock.
 */
function addBakeryMatchedIngredients(bakeries, ingredients) {
  const bakeriesWithMatchedIngredients = arrayMap(bakeries, (bakery) => {
    return {
      // We retain the rest of the bakery object's properties
      ...bakery,
      // We add a matchedIngredients prop, which is an array of strings.
      // An ingredient is a match if it shows up in the bakery.stock
      matchedIngredients: arrayFilter(ingredients, (ingredient) => {
        return arrayIncludes(bakery.stock, ingredient);
      }),
    };
  });
  return bakeriesWithMatchedIngredients;
}

/**
 * Given an array of ingredients, each with known sources,
 * and given an array of bakeries,
 *
 * Return the array of ingredients, with each now having a .chosenBakery
 * property. This function will choose bakeries for each ingredient
 * while trying to ensure that every bakery is chosen for at least
 * one ingredient.
 */
function chooseBakeries(ingredients, bakeries) {
  // First, figure out how many ingredients each bakery can source.
  const bakeriesWithMatchedIngredients = addBakeryMatchedIngredients(
    bakeries,
    ingredients
  );
  // We'll assign the bakeries that can source the fewest ingredients first,
  // to avoid excluding bakeries that could otherwise participate.
  const bakeriesByIngredientCount = bakeriesWithMatchedIngredients.sort(
    (a, b) => {
      const aCount = a.matchedIngredients.length;
      const bCount = b.matchedIngredients.length;
      const sortAThenB = aCount < bCount;
      const sortBThenA = bCount < aCount;
      return sortAThenB ? -1 : sortBThenA ? 1 : 0;
    }
  );
  // For each ingredient, find a bakery that can source that ingredient,
  // and assign the bakery to the ingredient by name.
  // Include all bakeries where possible.
  const chosenBakeries = [];
  const ingredientsWithBakeries = arrayMap(ingredients, (ingredient) => {
    const { sources } = ingredient;
    let chosenBakery;
    // Look for a chosenBakery that is not yet participating in the recipe.
    // Note that because the bakeries are sorted here by how many ingredients
    // they can provide, we can take the first chosenBakeries we find.
    for (let i = 0; i < bakeriesByIngredientCount.length; i++) {
      const bakery = bakeriesByIngredientCount[i];
      const isMatchedBakery = arrayIncludes(sources, bakery.name);
      const isNotYetChosen =
        arrayIncludes(chosenBakeries, bakery.name) == false;
      if (isMatchedBakery && isNotYetChosen) {
        chosenBakery = bakery.name;
        chosenBakeries.push(bakery.name);
        // Once we've chosen a bakery we can stop looking
        break;
      }
    }
    // If we still don't have a chosenBakery, we try the assignment again
    // without the participation parameter. This ensures that any ingredient
    // that is possible to source from some bakery will be assigned.
    if (!chosenBakery) {
      for (let i = 0; i < bakeriesByIngredientCount.length; i++) {
        const bakery = bakeriesByIngredientCount[i];
        const isMatchedBakery = arrayIncludes(sources, bakery.name);
        if (isMatchedBakery) {
          chosenBakery = bakery.name;
          // Once we've chosen a bakery we can stop looking
          break;
        }
      }
    }
    // Return the ingredient with its chosenBakery (may be undefined)
    return { ...ingredient, chosenBakery };
  });
  // Return the ingredients, now with a chosenBakery property.
  // (note that chosenBakery may be undefined, if no bakery has the ingredient)
  return ingredientsWithBakeries;
}

/**
 * A function that picks recipes to help many bakeries work together.
 *
 * We want to find a recipe that meets the following criteria:
 *
 * - all ingredients for the recipe can be sourced
 *   from at least one of the bakeries.
 * - all bakeries can participate in the recipe
 *   by providing at least one ingredient.
 *
 * @param {{ name: string, stock: string[] }} bakeries A list of bakeries.
 * @param {{ name: string, ingredients: string[] }} recipes A list of recipes. Note that each recipe has at least two ingredients.
 * @param {Object} options Configuration options
 * @param {boolean} options.verbose Enables verbose logging of recipe selection
 * @return {string} The name of a single correct recipe.
 */
const chooseRecipe = function (bakeries, recipes, options = {}) {
  const parsedRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    // Determine from whence we could source each ingredient
    const sourcedIngredients = addIngredientSources(
      recipe.ingredients,
      bakeries
    );
    // Determine if we have all ingredients for this recipe
    const missingIngredients = arrayFilter(sourcedIngredients, (ingredient) => {
      return ingredient.sources.length == 0;
    });
    // Assign ingredients to each bakery
    const assignedIngredients = chooseBakeries(sourcedIngredients, bakeries);
    // Determine whether all bakeries have been included in this recipe
    const excludedBakeries = arrayFilter(
      arrayMap(bakeries, (b) => b.name),
      (bakeryName) => {
        const providesSomeIngredient =
          arrayFilter(
            assignedIngredients,
            (ingredient) => ingredient.chosenBakery == bakeryName
          ).length > 0;
        return !providesSomeIngredient;
      }
    );
    // A recipe is a match if we can source all ingredients, and include all bakeries
    const hasAllIngredients = missingIngredients.length === 0;
    const includesAllBakeries = excludedBakeries.length === 0;
    const isMatch = hasAllIngredients && includesAllBakeries;
    // Add the recipe, now in parsed form, to our array of parsed recipes
    parsedRecipes.push({
      name: recipe.name,
      ingredients: assignedIngredients,
      excludedBakeries,
      missingIngredients,
      hasAllIngredients,
      includesAllBakeries,
      isMatch,
    });
  }
  // Set up an array for matched recipes
  const matchedRecipes = [];
  // Iterate over the parsed recipes, explaining the situation for each.
  for (let i = 0; i < parsedRecipes.length; i++) {
    const parsedRecipe = parsedRecipes[i];
    // Push to matches array if it's a match
    if (parsedRecipe.isMatch) {
      matchedRecipes.push(parsedRecipe);
    }
    // Optional verbose mode: log an explanation on this recipe
    if (options.verbose) {
      logRecipeDetails(parsedRecipe, bakeries);
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
  return matchedRecipes[0].name;
};

/**
 * Log out some detailed information about why a recipe was or wasn't selected.
 *
 * If a recipe was selected, this will show us which ingredients we should
 * pick from which bakeries.
 *
 * If a recipe was not selected, this will show us exactly why.
 *
 * @param {*} recipe
 * @param {*} bakeries
 */
function logRecipeDetails(recipe, bakeries) {
  const C = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    dim: "\x1b[2m",
  };

  const {
    name,
    ingredients,
    excludedBakeries,
    hasAllIngredients,
    includesAllBakeries,
    isMatch,
  } = recipe;

  let msg = "\n";
  msg += `${isMatch ? C.green : C.red}${name}${C.reset}\n`;

  // Print information about ingredient availability
  msg += `  ${C.dim}${
    hasAllIngredients
      ? "Ingredients are all available:"
      : "Some ingredients are missing:"
  }${C.reset}\n`;
  msg += `    ${ingredients
    .map((i) => {
      let msg = ``;
      msg += i.sources.length > 0 ? C.green : C.red;
      msg += `"${i.name}"`;
      msg += C.reset;
      return msg;
    })
    .join(`${C.dim}, ${C.reset}`)}\n`;

  // Print information about bakery involvement
  msg += `  ${C.dim}${
    includesAllBakeries
      ? "Bakeries are all included:"
      : "Some bakeries are being left out:"
  }${C.reset}\n`;

  let bakeriesMsg = ``;
  bakeriesMsg += bakeries
    .map(({ name, stock }) => {
      const isExcluded = arrayIncludes(excludedBakeries, name);
      const excludedColor = includesAllBakeries ? C.reset : C.red;
      const includedColor = includesAllBakeries ? C.green : C.dim;
      let msg = ``;
      msg += isExcluded ? excludedColor : includedColor;
      msg += `    ${name}`;
      msg += C.reset;
      msg += C.dim;
      msg += ` ${stock
        .map((s) => {
          const matchedIngredient = ingredients.filter(
            (i) => i.name == s && i.chosenBakery == name
          );
          const isInRecipe = matchedIngredient.length > 0;
          let msg = ``;
          msg += isInRecipe ? C.reset + C.green : C.dim;
          msg += `"${s}"`;
          msg += C.reset;
          return msg;
        })
        .join(`${C.dim}, ${C.reset}`)}`;
      msg += C.reset;

      return msg;
    })
    .join("\n");
  bakeriesMsg += `\n`;

  msg += bakeriesMsg;

  console.log(msg);
}

let bakeries = [
  {
    name: "Bakery A",
    stock: ["saffron", "eggs", "tomato paste", "coconut", "custard"],
  },
  {
    name: "Bakery B",
    stock: ["milk", "butter", "cream cheese"],
  },
  {
    name: "Bakery C",
    stock: ["cake base", "saffron", "cream cheese", "vanilla"],
  },
  {
    name: "Bakery D",
    stock: ["eggs", "saffron"],
  },
];
let recipes = [
  {
    name: "Coconut Sponge Cake",
    ingredients: ["coconut", "cake base"],
  },
  {
    name: "Persian Cheesecake",
    ingredients: ["saffron", "cream cheese", "cake base", "eggs", "vanilla"],
  },
  {
    name: "Custard Surprise",
    ingredients: ["custard", "ground beef"],
  },
  {
    name: "Persion Cheesecake Surprise",
    ingredients: ["custard", "milk", "saffron", "eggs", "ground beef"],
  },
];

console.log(chooseRecipe(bakeries, recipes, { verbose: false }));

bakeries = [
  {
    name: "Bakery A",
    stock: ["potatoes", "bay leaf", "raisins"],
  },
  {
    name: "Bakery B",
    stock: ["red bean", "dijon mustard", "yellow mustard", "apples"],
  },
  {
    name: "Bakery C",
    stock: ["yellow mustard"],
  },
];
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
    ingredients: ["dijon mustard", "raisins", "yellow mustard"],
  },
];

console.log(chooseRecipe(bakeries, recipes, { verbose: false }));
