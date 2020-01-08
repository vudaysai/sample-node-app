var ABTesting = require("ab-testing");

const test1 = () => {
  // console.log("Test 1 sometimes here");
  return "Test 1 sometimes here";
};

const test2 = () => {
  // console.log("Test 2 mostly here");
  return "Test 2 mostly here";
};

const sendToAnalytics = (a, b) => {
  console.log("Triggered module", b);
  return "Triggered module is " + b;
};

const calcModuleOneWeight = id => {
  console.log("w1", Number(id) < 5 ? 1 : 0.3);
  return Number(id) < 5 ? 1 : 0.3;
};

const calcModuleTwoWeight = id => {
  console.log("w2", Number(id) > 5 ? 1 : 0.3);
  return Number(id) > 5 ? 1 : 0.5;
};

module.exports.lala = someId => {
  var moduleSelectionTest = ABTesting.createTest("firstTest", [
    { name: "module1", weight: calcModuleOneWeight(someId) },
    { name: "module2", weight: calcModuleTwoWeight(someId) }
  ]);

  var moduleGroup = moduleSelectionTest.getGroup(someId);

  var testName = moduleSelectionTest.getName();

  moduleSelectionTest.test(
    moduleGroup,
    [
      function() {
        test1();
      },
      function() {
        test2();
      }
    ],
    this
  );

  return sendToAnalytics(testName, moduleGroup);
};
