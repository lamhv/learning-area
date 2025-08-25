const {
    TABLE_ARR,
} = require("./merge_util.js")

let CHANGELOG_DATASET = 'cdc_dataform'

TABLE_ARR.forEach(table => {
    console.log(table.toastField);
    if (table.toastField) {
        console.warn(`Table ${table.tableName} has a toast field.`);
    }

    const replaceClause = table.transConf ? `REPLACE(
        ${Object.values(table.transConf.transforms).join(', ')}
    )` : ''
    let filterClause = table.filter? `AND ${table.filter}`: ''

    let sql = `
    SELECT * ${replaceClause}
FROM ${CHANGELOG_DATASET}_${table.tableName}
WHERE (${table.chParCol} >= TIMESTAMP_TRUNC(TIMESTAMP_SUB(CURRENT_TIMESTAMP, INTERVAL ${table.interval} ${table.unitTime}), ${table.unitTime}) OR ${table.chParCol} IS NULL)
    ${filterClause}`

    console.log(sql);
    console.log('\n');
    console.log('--------------------------------------------------');
})