const Joi = require('joi');
const r = require('../utils/resHelpers');

const validate = (schema) => async (req, res, next) => {
  try {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      throw new Error(errorMessage);
    }
    Object.assign(req, value);
    return next();
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = validate;
