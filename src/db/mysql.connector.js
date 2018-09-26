const mysql = require('mysql');
const chalk = require('chalk');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@mysql',
  database: 'test'
});

module.exports.getConnection = () => {
  return connection;
}

module.exports.connect = () => {
  connection.connect((err) => {
    if (err) {
      console.log(chalk.red('Error connecting to mysql database...'), err);
      return;
    }
    console.log(chalk.green('Error connecting to mysql database...'))
  });
}

module.exports.disconnect = () => {
  connection.end();
}
