'use strict'
const fs = require('fs');
const helpers = require('../helpers/formatter');
const chalk = require('chalk');

console.log(chalk.green('start building routes..'));

function getController(modulename) {
  const moduleName = modulename.toLowerCase();

  return `
    const ${modulename} = require('../models/${moduleName}')

    /**
    * @desc - module for get all ${moduleName}s.
    */
    module.exports.get${modulename}s = (req, res) => {
      const query = ${modulename}.find({});
      query
        .lean()
        .exec()
        .then(users => res.status(200)
          .json(users))
        .catch(err => res.status(500)
          .json({error: true, message: err.message}))
    }

    /**
    * @desc - module for get single ${modulename} by _id.
    */
    module.exports.get${modulename}ById = (req, res) => {
      const _id = req.params.${moduleName}Id;
      
      if (!_id)
        return res.status(400)
          .json({ error: true, message: "${moduleName}Id Required" })

      ${modulename}.findById(_id)
        .lean()
        .exec()
        .then(${moduleName} => res.status(200)
          .json(${moduleName}))
        .catch(err => res.status(500)
          .json({ error: true, message: err.message }))
    }

    /**
    * @desc - module for save ${modulename}
    */
    module.exports.create = (req, res) => {
      const ${moduleName} = new ${modulename}(req.body);

      ${moduleName}.save((err, ${moduleName}) => {
        if (err)
          return res.status(500)
            .json({ error: true, message: err.message })

        return res.status(201)
          .json(${moduleName})
      })
    }

    /**
    * @desc - module for delete ${moduleName}
    */
    module.exports.delete = (req, res) => {
      const _id = req.params.${modulename}Id;

      ${modulename}.findByIdAndRemove(_id)
        .lean()
        .exec()
        .then(${moduleName} => res.status(200)
          .json(${moduleName}))
        .catch(err => res.status(500)
          .json({ error: true, message: err.message }))
    }

    /**
    * @desc - module for save user
    */
    module.exports.update = (req, res) => {
      const ${moduleName} = req.body;
      const _id = user._id;

      const query = { _id },
        update = { $set: ${moduleName} },
        options = { new: true };

      ${modulename}.findByIdAndUpdate(query, update, options)
        .lean()
        .exec()
        .then(${moduleName} => res.status(200)
          .json(${moduleName}))
        .catch(err => res.status(500)
          .json({ error: true, message: err.message }))
    }
  `
}

module.exports.generateControoler = (moduleName) => {
  const generatedRoute = getController(moduleName);
  const formattedCode = helpers.formatCode(generatedRoute);
  console.log(generatedRoute);
  fs.writeFile(`./dist/${moduleName.toLowerCase()}.controller.js`, formattedCode, 'utf-8', (err) => {
    if (err) throw err;
    console.log(chalk.yellow(`${moduleName.toLowerCase()}.controller.js generated`));
  });
}