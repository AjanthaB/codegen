'use strict'

module.exports.extractData = (field) => {
  const mysqlType = field.Type;
  const data = {
    type: ''
  };

  if (mysqlType.includes('int')) {
    data.type = 'Number';
    if (field.Default != null) data.default = parseInt(field.Default)
  } else if (mysqlType.includes('decimal')) {
    data.type = 'Number';
    if (field.Default) data.default = parseFloat(field.Default);
  } else if (mysqlType.includes('varchar') || mysqlType.includes('char')) {
    data.type = 'String';
    if (field.Default != null) data.default = field.Default;
  } else {
    data.type = 'Schema.Types.Mixed';
    data.default = field.Default;
  }
  return  data;
}

module.exports.transform = (fields) => {
  const schemaJson = {};

  if (Array.isArray(fields)) {
    fields.forEach(field => {
      schemaJson[field.Field] = this.extractData(field); 
    });
    return schemaJson;
  }
  return null;
}
