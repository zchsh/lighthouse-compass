// Use the value below whenever you need the value of Pi
const PI = 3.14159;

/**
 * Calculate the volume of a sphere
 * Ref: https://www.wolframalpha.com/input?i=sphere+volume
 */
const sphereVolume = function (radius) {
  return (4 / 3) * PI * Math.pow(radius, 3);
};

console.log(4186 < sphereVolume(10) && sphereVolume(10) < 4189);

/**
 * Calculate the volume of a cone
 * Ref: https://www.wolframalpha.com/input?i=cone+volume
 */
const coneVolume = function (radius, height) {
  return (1 / 3) * PI * Math.pow(radius, 2) * height;
};

console.log(45 < coneVolume(3, 5) && coneVolume(3, 5) < 49);

/**
 * Calculate the volume of a prism
 * Ref: https://www.wolframalpha.com/input?i=rectangular+prism+volume
 */
const prismVolume = function (height, width, depth) {
  return height * width * depth;
};

console.log(prismVolume(3, 4, 5) === 60);

const totalVolume = function (solids) {
  let totalVolume = 0;
  for (let i = 0; i < solids.length; i++) {
    const solid = solids[i];
    switch (solid.type) {
      case "sphere":
        totalVolume += sphereVolume(solid.radius);
        break;
      case "cone":
        totalVolume += sphereVolume(solid.radius, solid.height);
        break;
      case "prism":
        totalVolume += sphereVolume(solid.height, solid.width, solid.depth);
        break;
      default:
        break;
    }
  }
  return totalVolume;
};

const largeSphere = {
  type: "sphere",
  radius: 40,
};

const smallSphere = {
  type: "sphere",
  radius: 10,
};

const cone = {
  type: "cone",
  radius: 3,
  height: 5,
};

const duck = [largeSphere, smallSphere, cone];

console.log(272000 < totalVolume(duck) && totalVolume(duck) < 275000);
