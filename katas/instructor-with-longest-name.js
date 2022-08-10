const instructorWithLongestName = function (instructors) {
  let leader;
  for (var i = 0; i < instructors.length; i++) {
    // if there's no longest name yet, use this one!
    if (!leader) {
      leader = instructors[i];
      continue;
    }
    // otherwise, compare the length of this name to the longest name
    const isLongerName = instructors[i].name.length > leader.name.length;
    if (isLongerName) {
      leader = instructors[i];
    }
  }
  return leader;
};

console.log(
  instructorWithLongestName([
    { name: "Samuel", course: "iOS" },
    { name: "Jeremiah", course: "Web" },
    { name: "Ophilia", course: "Web" },
    { name: "Donald", course: "Web" },
  ])
);
console.log(
  instructorWithLongestName([
    { name: "Matthew", course: "Web" },
    { name: "David", course: "iOS" },
    { name: "Domascus", course: "Web" },
  ])
);
