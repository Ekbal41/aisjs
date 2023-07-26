function validate(argsObj, validationRules) {
  const errors = {};

  for (const argName in argsObj) {
    const argValue = argsObj[argName];
    const capArgName = argName.charAt(0).toUpperCase() + argName.slice(1);

    if (!validationRules || validationRules.length === 0) {
      if (!argValue) {
        errors[argName] = `${capArgName} is required.`;
      }
    } else {
      const validationRule = validationRules
        ? validationRules[argName]
        : undefined;

      if (!argValue) {
        if (validationRule.message && !validationRule.validator) {
          errors[argName] = validationRule.message;
        } else {
          errors[argName] = `${capArgName} is required.`;
        }
      } else if (validationRule) {
        const { validator, message } = validationRule;
        if (validator && !validator(argValue)) {
          errors[argName] = message || `${capArgName} is invalid.`;
        }
      }
    }
  }

  if (Object.keys(errors).length > 0) return errors;
  return false;
}
module.exports = validate;
