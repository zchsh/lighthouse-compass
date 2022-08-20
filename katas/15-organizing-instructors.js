const organizeInstructors = function (instructors) {
  const instructorsByCourse = {};
  // Iterate over the instructors
  for (var i = 0; i < instructors.length; i++) {
    const { name, course } = instructors[i];
    // If we don't have an array for this course type yet, initialize it.
    if (!instructorsByCourse[course]) {
      instructorsByCourse[course] = [];
    }
    // Push this instructor to the array for this course type.
    instructorsByCourse[course].push(name);
  }
  // Return our organized object
  return instructorsByCourse;
};

console.log(
  organizeInstructors([
    { name: "Samuel", course: "iOS" },
    { name: "Victoria", course: "Web" },
    { name: "Karim", course: "Web" },
    { name: "Donald", course: "Web" },
  ])
);
console.log(
  organizeInstructors([
    { name: "Brendan", course: "Blockchain" },
    { name: "David", course: "Web" },
    { name: "Martha", course: "iOS" },
    { name: "Carlos", course: "Web" },
  ])
);
