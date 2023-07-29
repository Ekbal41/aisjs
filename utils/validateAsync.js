async function validateAsync(argsObj, validationRules) {
  const errors = {};

  async function runValidatorAsync(validator, value) {
    try {
      const isValid = await validator(value);
      return isValid;
    } catch (error) {
      return false;
    }
  }

  const validationPromises = [];

  for (const argName in argsObj) {
    const argValue = argsObj[argName];
    const capArgName = argName.charAt(0).toUpperCase() + argName.slice(1);

    if (!validationRules || validationRules.length === 0) {
      if (!argValue) {
        errors[argName] = `${capArgName} is required.`;
      }
    } else {
      const validationRule = validationRules[argName];

      if (!argValue) {
        errors[argName] = `${capArgName} is required.`;
        if (validationRule?.message && !validationRule?.validator) {
          errors[argName] = validationRule.message;
        } else {
          errors[argName] = `${capArgName} is required.`;
        }
      } else if (validationRule) {
        const { validator, message } = validationRule;

        if (validator) {
          validationPromises.push(
            runValidatorAsync(validator, argValue).then((isValid) => {
              if (!isValid) {
                errors[argName] = message || `${capArgName} is invalid.`;
              }
            })
          );
        }
      }
    }
  }

  await Promise.all(validationPromises);

  if (Object.keys(errors).length > 0) return errors;
  return false;
}
module.exports = validateAsync;
