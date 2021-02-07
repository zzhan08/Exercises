/*
 * Gets the batch STD and AVG json schema
 */
let currentStatusSchema:any = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ip: {
      type: 'string',
      format: 'ip-format'
    }
  },
  required: []
};

module.exports = currentStatusSchema;
