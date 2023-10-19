const models = require("../models");
const db = require("../config/connection");

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db
      .listCollections({
        name: collectionName,
      })
      .toArray();
    // drop the collections if already exist
    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
