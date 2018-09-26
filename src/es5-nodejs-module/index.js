'use strict'

const chalk = require('chalk');
const rimraf = require('rimraf');
const fs = require('fs');
console.log(chalk.green('Starting code generations'));

console.log(chalk.green('reading configuarations...'));
const moduleData = require('./data');
console.log(chalk.green('reading configuarations done.'));


function generateModule() {
  // route generation
  const routesgenerator = require('./routes.generator');
  routesgenerator.generateRoutes(moduleData.moduleName);

  // controller generation
  const controllerGenerator = require('./controller.generator');
  controllerGenerator.generateControoler(moduleData.moduleName);
}

function start() {
  rimraf('./dist', (err) => {
    if (err) throw err;
    console.log('removed dist directory');
    fs.mkdirSync('./dist');
    generateModule();
  });
}

// start();

const mysql = require('../db/mysql.connector');
mysql.connect();
mysql.getConnection().query('describe products', function (error, results, fields) {
  if (error) throw error;
  
  const schema = require('../helpers/mysql.dataTransformer').transform(results);
  console.log(schema);
  mysql.disconnect();
});







