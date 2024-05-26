const { getData } = require("../db/db");

const executeQuery = async (query, parameters, transaction = null) => {
  try {
    const request = transaction
      ? transaction.request()
      : (await getData()).request();
    if (parameters)
      parameters.forEach((parameter) => {
        request.input(parameter.name, parameter.type, parameter.value);
      });

    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

module.exports = { executeQuery };
