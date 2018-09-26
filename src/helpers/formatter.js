const esformatter = require('esformatter');

module.exports.formatCode = (string) => {
  return  esformatter.format(string);
}