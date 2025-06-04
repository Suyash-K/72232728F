const { z } = require('zod');

const numberIdSchema = z.enum(['p', 'f', 'e', 'r'], {
  errorMap: () => ({ message: 'Number ID must be one of: p (prime), f (fibonacci), e (even), r (random)' })
});

const validateNumberId = (numberid) => {
  try {
    return numberIdSchema.parse(numberid);
  } catch (error) {
    throw new Error(error.errors[0].message);
  }
};

module.exports = {
  validateNumberId
};