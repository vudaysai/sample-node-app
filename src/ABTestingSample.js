var ABTesting = require("./abTesting");

const test1 = () => {
  console.log("Test 1 func()");
};

const test2 = () => {
  console.log("Test 2 func()");
};

const test3 = () => {
  console.log("Test 3 func()");
};

const sendToAnalytics = (a, b) => {
  console.log("Analytics module  ", b);
  console.log("--------------------------");
  return "Triggered module is " + b;
};

const calcModuleOneWeight = id => {
  return Number(id) < 5 ? 0.8 : 0.1;
};

const calcModuleTwoWeight = id => {
  return Number(id) >= 5 && Number(id) <= 20 ? 0.8 : 0.1;
};

const calcModuleThreoWeight = id => {
  return Number(id) > 20 ? 0.8 : 0.1;
};

module.exports.executeTest = someId => {
  console.log(
    "module1  ",
    calcModuleOneWeight(someId),
    "  module2  ",
    calcModuleTwoWeight(someId),
    "  module3  ",
    calcModuleThreoWeight(someId)
  );
  var moduleSelectionTest = ABTesting.createTest("firstTest", [
    { name: "module1", weight: calcModuleOneWeight(someId) },
    { name: "module2", weight: calcModuleTwoWeight(someId) },
    { name: "module3", weight: calcModuleThreoWeight(someId) }
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
      },
      function() {
        test3();
      }
    ],
    this
  );

  return sendToAnalytics(testName, moduleGroup);
};
