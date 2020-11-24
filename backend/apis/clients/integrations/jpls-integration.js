const { upsertClient } = require("juntos-por-la-salud-node-client");

module.exports = function juntosPorLaSalud(integration, client) {
  console.log("upserting client to jpls");
  return upsertClient({
    client,
    participantId: integration.externalId,
    username: process.env.JPLS_USERNAME,
    password: process.env.JPLS_PASSWORD,
  })
    .then((participantId) => {
      if (!participantId) {
        throw Error("No participant id found after upsert");
      } else {
        return {
          error: null,
          externalId: participantId,
        };
      }
    })
    .catch((error) => ({
      error,
    }));
};
