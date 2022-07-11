const runSchema = (schema) => async (unknown) => {
  try {
    const value = await schema.validateAsync(unknown);
    return value;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { runSchema };
