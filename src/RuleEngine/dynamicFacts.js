const { Engine, Rule } = require("json-rules-engine");

const apiClient = require("./mock-api-client");

module.exports.checRule = async data => {
  const engine = new Engine();

  const microsoftRule = {
    conditions: {
      all: [
        {
          fact: "account-information",
          operator: "equal",
          value: "microsoft",
          path: "$.company" // access the 'company' property of "account-information"
        },
        {
          fact: "account-information",
          operator: "in",
          value: ["active", "paid-leave"], // 'status'' can be active or paid-leave
          path: "$.status" // access the 'status' property of "account-information"
        },
        {
          fact: "account-information",
          operator: "contains",
          value: "2016-12-25",
          path: "$.ptoDaysTaken.*" // access the 'ptoDaysTaken' property of "account-information"
        }
      ]
    },
    event: {
      type: "microsoft-christmas-pto",
      params: {
        message: "current microsoft employee taking christmas day off"
      }
    }
  };

  engine.addRule(microsoftRule);

  engine.addFact("account-information", async function(params, almanac) {
    return almanac.factValue("accountId").then(async accountId => {
      var a = await apiClient.getAccountInformation(accountId);
      return a;
    });
  });

  const facts = { accountId: "lincoln" };

  engine
    .on("success", (event, almanac, ruleResult) => {
      console.log("eng succ", ruleResult.conditions.all);
    })
    .on("failure", (event, almanac, ruleResult) => {
      console.log("eng fail", ruleResult.conditions.all);
    });

  await engine
    .run(facts)
    .then(results => {
      if (!results.events.length) return;
      console.log(
        facts.accountId +
          " is a " +
          results.events.map(event => event.params.message)
      );
    })
    .catch(err => console.log(err.stack));
};
