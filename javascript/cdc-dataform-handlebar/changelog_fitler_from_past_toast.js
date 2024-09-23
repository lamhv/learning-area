const {
    TABLE_ARR,
} = require("./merge_util.js")

let CHANGELOG_DATASET = 'cdc_dataform'

TABLE_ARR.filter(table => table.toastField).forEach(table => {
    const partitionClauseByPrimaryKey = table.primaryKey
    const jsonTransClause = table.transConf ? table.transConf.jsonTransClause : undefined
    const orderKeyClause = table.orderKey.split(',').map(oK => oK.trim() + ' DESC').join(', ')
    const replaceClause = table.transConf ? `REPLACE(
        ${Object.values(table.transConf.transforms).join(',\n')}
    )` : ''
    let selectClause = ''
    let exceptClause = ''
    let filterClause = ''
    let fromClause = ''
    let groupClause = ''

    table.toastField.split(',').map(tf => tf.trim()).forEach(toastField => {

        filterClause = `AND ${toastField} != '__debezium_unavailable_value'`

        if (table.filter) {
            filterClause = `${filterClause} AND ${table.filter} `
        }
    
        if(jsonTransClause && Object.keys(jsonTransClause).length > 0) {
            exceptClause = `EXCEPT(${Object.values(jsonTransClause).map(o => o.mapping).join(', ')})`
            selectClause = [selectClause, ...Object.values(jsonTransClause).map(o => o.originalField)].join(', ')
            fromClause = [fromClause, ...Object.values(jsonTransClause).map(o => o.joinExpr)].join(' LEFT JOIN\n')
            groupClause = 'GROUP BY ALL'
        }
    
        let sql = `
            SELECT * ${exceptClause} ${replaceClause}
            FROM (
                SELECT
                    *,
                    ROW_NUMBER() OVER (PARTITION BY ${partitionClauseByPrimaryKey} ORDER BY ${orderKeyClause}) AS row_num${selectClause}
                FROM ${CHANGELOG_DATASET}_${table.tableName}
                WHERE
                    (${table.chParCol} >= TIMESTAMP_TRUNC(TIMESTAMP_SUB(CURRENT_TIMESTAMP, INTERVAL ${table.interval} ${table.unitTime}), ${table.unitTime}) OR ${table.chParCol} IS NULL)
                    ${filterClause}
            )${fromClause}
            WHERE row_num = 1
            ${groupClause}
        `;
        console.log(sql);
        console.log('\n');

    })
});