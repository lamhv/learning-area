const { TransformConfig } = require('./trans_config.js') 

class TableConfig {
    static #objProps = ['table_name', 'replica_partition_col', 'changelog_partition_col', 'primary_key',
        'order_key', 'unit_time', 'interval_unit', 'transforms', 'filter', 'toast_field', 'ignore_delete'
    ]

    static getPropsDefaults(jsonObj) { 
        return Object.fromEntries(TableConfig.#objProps.map(p => [p, jsonObj[p]]))
    }

    static build(objStr) {
        const jsonObj = JSON.parse(objStr)
        const propsDefault = TableConfig.getPropsDefaults(jsonObj)
        return jsonObj.tables.map(table => {
            var props = TableConfig.#objProps.map(propName => {
                return table[propName] ?? propsDefault[propName]
            })
            return new TableConfig(...props)
        })
    }

    constructor(name, reParCol, chParCol, primaryKey, orderKey, unitTime, interval, transform, filter, toastField, ignoreDel) {
        this.tableName = name
        this.reParCol = reParCol
        this.chParCol = chParCol
        this.primaryKey = primaryKey
        this.orderKey = orderKey
        this.unitTime = unitTime
        this.interval = interval
        this.transConf = transform ? new TransformConfig(transform) : undefined
        this.filter = filter
        this.toastField = toastField
        this.ignoreDel = ignoreDel
    }
}

module.exports = { TableConfig }