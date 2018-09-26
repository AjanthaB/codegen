'use strict'
const fs = require('fs');
const helpers = require('../helpers/formatter');
const chalk = require('chalk');

console.log(chalk.green('start building routes..'));

function generateRoute(modulename) {
  const moduleName = modulename.toLowerCase();
  const contollerName = `${moduleName}Controller`;
  return `
    /**
    * @author : Ajantha Bandara
    * @copyright: 2018, Bilstrap codegen
    */

    const ${contollerName} = require('../controllers/${moduleName}.controller');

    module.exports = (app) => {

      app.route('/api/v1/${moduleName}s')
        .get(${contollerName}.get${modulename}s)
        .post(${contollerName}.save${modulename})
        .put(${contollerName}.update${modulename})

      app.route("/api/v1/${moduleName}s/:${moduleName}Id")
        .get(${contollerName}.get${modulename}ById)
        .delete(${contollerName}.delete);
    }
  `;
}

module.exports.generateRoutes = (moduleName) => {
  const generatedRoute = generateRoute(moduleName);
  const formattedCode = helpers.formatCode(generatedRoute);
  console.log(generatedRoute);
  fs.writeFile(`./dist/${moduleName.toLowerCase()}.route.js`, formattedCode, 'utf-8', (err) => {
    if (err) throw err;
    console.log(chalk.yellow(`${moduleName.toLowerCase()}.route.js generated`));
  });
}




