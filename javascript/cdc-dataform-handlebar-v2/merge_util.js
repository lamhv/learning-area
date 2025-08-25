const fs = require('fs');
const yaml = require('js-yaml');

const {
    TableConfig
} = require('./table_config.js');

// Define the path to your YAML file
const filePath = './table_config.yaml';

let TABLE_ARR = [];
try {
    // Read the YAML file
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Parse the YAML file contents
    const data = yaml.load(fileContents);
    // let jsonObject = JSON.parse(data.vars.tableConf);
    // console.log(jsonObject);

    TABLE_ARR = TableConfig.build(data.vars.tableConf)
    console.log(TABLE_ARR);

} catch (e) {
    console.error(e);
}

module.exports = {
    TABLE_ARR
  }