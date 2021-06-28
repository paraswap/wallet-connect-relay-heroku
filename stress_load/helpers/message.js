const { generateRandomTopic } = require("./topic");

const TEST_MESSAGE = "08ca02463e7c45383d43efaee4bbe33f700df0658e99726a755fd77f9a040988";

function genertePubSubMessages(topic = generateRandomTopic(), payload = "") {

  const pub = {
    topic,
    type: "pub",
    payload,
    silent: true,
  };

  const sub = {
    topic,
    type: "sub",
    payload: "",
    silent: true,
  };

  const ack = {
    topic,
    type: "ack",
    payload: "",
    silent: true,
  };

  return { pub, sub, ack };
}

module.exports = { genertePubSubMessages }