const { Engine, Rule } = require("json-rules-engine");

var rule = new Rule({
  conditions: {
    any: [
      {
        all: [
          {
            fact: "gameDuration",
            operator: "equal",
            value: 40
          },
          {
            fact: "personalFoulCount",
            operator: "greaterThanInclusive",
            value: 5
          }
        ]
      },
      {
        all: [
          {
            fact: "gameDuration",
            operator: "equal",
            value: 48
          },
          {
            fact: "personalFoulCount",
            operator: "greaterThanInclusive",
            value: 6
          }
        ]
      }
    ]
  },
  event: {
    type: "fouledOut",
    params: {
      message: "Player has fouled out!"
    }
  }
});

module.exports.checRule = async data => {
  var engine = new Engine();
  engine.addRule(rule);

  engine
    .on("success", (event, almanac) => {
      console.log("eng succ", event);
    })
    .on("failure", event => {
      console.log("eng fail", event);
    });

  var lala = await engine.run(data).then(results => {
    // console.log(results, "results");
    return results.events.map(x => x.params.message);
  });

  console.log("---------------");
  console.log("---------------");

  console.log(lala, "lala");
  return lala.join(",");
};
