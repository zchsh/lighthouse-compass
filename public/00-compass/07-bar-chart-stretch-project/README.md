### Bar Chart Stretch Project

## Overview

## Functional Requirements

You should have a simple API to draw a bar chart. The function should be used by your HTML page to render the chart into your demo page. The signature of the function should be as follows:

```js
drawBarChart(data, options, element);
```

- The `data` parameter will be the data the chart should work from. Start with just an Array of numbers, such as `[1, 2, 3, 4, 5]`.
- The `options` parameter should be an object which has options for the chart. For example, the `width` and `height` of the bar chart.
- The `element` parameter should be a DOM element or jQuery element that the chart will get rendered into.

## Display Requirements

### Bar Chart

- [ ] Display a list of single values, horizontally as a bar chart

  - Numerical values should also be displayed inside of the bar
  - The position of values should be customizable too: Top, centre or bottom of the bar.

- [ ] Bar sizes should be dependent on the data that gets passed in

  - Bar width should be dependent on the total amount of values passed.
  - Bar height should be dependent on the values of the data.

- [ ] Bar properties that should be customizable:

  - Bar Colour
  - Label Colour
  - Bar spacing (space between bars)
  - Bar Chart axes

- [ ] X-axis should show labels for each data value

  - Think about how you would need to structure your data to associate a label to each value

- [ ] Y-axis should show ticks at certain values

  - Think about where you would configure these values. Should they be part of the data or the options to the bar chart function.

- [ ] The title of the bar chart should be able to be set and shown dynamically

- [ ] The title of the bar chart should also be customizable:

  - Font Size
  - Font Colour

- [ ] Multiple Value (Stacked) bar charts

- [ ] Allow the user to pass multiple values for each bar.

  - Think about how you would need to structure this data compared to a single bar chart.

- [ ] This should also support all the features of the single bar chart, including

  - Customizable bar colours, per value
  - Customizable label colours

## Selected Tips

- Commit at every step. No commit is too small, but at the same time commit code that is not going to throw an error. One massive commit with all your work is going to result in an unsatisfactory submission.
- Don't look at the code for other charting libraries to see how they're implemented, because it will either be overwhelming, overkill, or cheating.
- This should be completed in only HTML, CSS and JavaScript w/ jQuery. You may find references to using SVG or Canvas for your solution. However we strongly advise that you stay away from those approaches.
- Try to break your solution down into small functions that will work together to solve the problem. One massive function will not be accepted, for example.

## Finishing the project

- Push your project up to your GitHub.
- Create a demo index.html page and [setup Github Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) for your repo.
  - The index.html file should show a few different examples of your bar charts in action. Generating a few bar charts in a `$(document).ready()` function call is perfectly acceptable.
  - Don't forget to test that the page on GitHub pages is working as expected.
- Add a `README.md` file with the following information to your project. The README should be in [Markdown format](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax):
  - About
  - Give some context to what your project is for
  - Example Screenshots (embedded within the readme as image tags)
  - List the API functions that you would expect a user to use
  - Describe the function and the parameters to each function
  - A Feature list of your library (options it supports, etc)
  - A list of known issues / bugs
  - A list of features that are on the roadmap but haven't been implemented yet
  - A list of all the external resources (tutorials, docs, example code, etc) that you encountered and used to help you create this library

Once you've completed these requirements, you may ask a mentor or instructor for a code review if you would like some feedback.
