const fs = require('fs');
const yaml = require('js-yaml');

const {
  TransformConf
} = require('./trans_util.js');

// Define the path to your YAML file
const filePath = './table_config.yaml';

// table config: include transformations
const TABLE_PROPERIES = ['table_name', 'replica_partition_col', 'changelog_partition_col', 'primary_key',
  'order_key', 'unit_time', 'interval_unit', 'transforms', 'filter', 'toast_field', "ignore_delete"
];

function TableInfo(name, reParCol, chParCol, primaryKey, orderKey, unitTime, interval, transConf, filter, toastField, ignoreDel) {
  this.tableName = name;
  this.reParCol = reParCol;
  this.chParCol = chParCol;
  this.primaryKey = primaryKey;
  this.orderKey = orderKey;
  this.unitTime = unitTime;
  this.interval = interval;
  this.transConf = transConf;
  this.filter = filter;
  this.toastField = toastField;
  this.ignoreDel = ignoreDel;
}

let TABLE_ARR = [];
try {
  // Read the YAML file
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parse the YAML file contents
  const data = yaml.load(fileContents);
  let jsonObject = JSON.parse(data.vars.tableConf);
  console.log(jsonObject);

  // get default properties from config
  let defaultProp = Object.fromEntries(TABLE_PROPERIES.map(propName => [propName, jsonObject[propName]]));
  console.log(defaultProp);

  jsonObject.tables.forEach ( table => {
    let properties = TABLE_PROPERIES.map(propName => {
      if (propName === 'transforms') {
        return table[propName]? new TransformConf(table[propName]) : undefined;
      }
      return table[propName]?? defaultProp[propName];
    });
    TABLE_ARR.push(new TableInfo(...properties));
  })

  console.log(TABLE_ARR);

} catch (e) {
  console.error(e);
}

module.exports = {
  TABLE_ARR
}