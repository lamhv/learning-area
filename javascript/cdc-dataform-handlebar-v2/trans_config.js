const Handlebars = require('handlebars')

class TransformConfig {
    constructor(transObj) {
        this.transforms = Object.keys(transObj).map(field =>
            `${Handlebars.compile(transObj[field])()} AS ${field}`
        )
    }
}

const TRANSFOMATIONS = {
    pnFormat: function (field, code = '\'VN\'', formatType = '\'E164\'') {
        return new Handlebars.SafeString(
            `fns.formatPhoneNumber(${field}, ${code}, ${formatType})`
        )
    },
    legacyPnFormat: function (field, code = '\'VN\'') {
        return new Handlebars.SafeString(
            `fns.legacyFormatPhoneNumber(${field}, ${code})`
        )
    },
    nIdFormat: function (field, code = '\'VN\'') {
        return new Handlebars.SafeString(
            `fns.formatNationalId(${field}, ${code})`
        )
    },
    encrypt: function (field) {
        return new Handlebars.SafeString(
            `fns.encryptEtl(${field})`
        )
    },
    validStr: function (field, elseResult) {
        return new Handlebars.SafeString(
            `IF(
                ${field} IS NULL OR LENGTH(TRIM(${field})) \= 0, 
                ${field}, 
                ${elseResult}
            )`
        )
    },
    applySplitStr: function (field, trans, offsets, delimiter = '\'|\'') {
        return new Handlebars.SafeString(
            `ARRAY_TO_STRING(
                ARRAY(
                    SELECT IF(__offset__ in (${offsets}), ${trans}, __splited__)
                    FROM UNNEST(split(${field}, ${delimiter})) __splited__ WITH OFFSET __offset__
                ),
                ${delimiter}
            )`
        )
    },
    applyJson: function (field, ...args) {
        console.log('arg:' + args)
        console.log('----- end arg -----')
        const jsonTrans = args.reduce((acc, val, index) => {
            if (index % 2 === 1) {
                const trans = args[index - 1]
                const paths = val
                acc.push(
                    `ARRAY(
                        SELECT JSON_SET(__mapping_value__, '$.value', ${trans})
                        FROM
                        ( 
                            SELECT __mapping_value__, JSON_VALUE(__mapping_value__, '\$.value') __json_value__
                            FROM UNNEST(
                                JSON_EXTRACT_ARRAY(
                                    PARSE_JSON(fns.extractJson(${field}, ${paths}))
                                )
                            ) __mapping_value__
                        )
                    )`
                )
            }
            return acc
        }, [])
        .join(',\n')
        return new Handlebars.SafeString(
            `fns.setJson(
                ${field}, 
                TO_JSON_STRING(
                    ARRAY_CONCAT(
                        ${jsonTrans}
                    )
                )
            )`
        )
    },
    encryptPn: function (field, code = '\'VN\'') {
        return TRANSFOMATIONS.validStr(
            field, TRANSFOMATIONS.encrypt(TRANSFOMATIONS.legacyPnFormat(field, code))
        )
    },
    encryptPnJson: function (field, paths, code = '\'VN\'') {
        return TRANSFOMATIONS.applyJson(
            field,
            TRANSFOMATIONS.encryptPn('__json_value__', code),
            paths
        )
    },
    encryptNId: function (field, code = '\'VN\'') {
        return TRANSFOMATIONS.validStr(
            field, TRANSFOMATIONS.encrypt(TRANSFOMATIONS.nIdFormat(field, code))
        )
    },
    encryptNIdJson: function (field, paths, code = '\'VN\'') {
        return TRANSFOMATIONS.applyJson(
            field,
            TRANSFOMATIONS.encryptNId('__json_value__', code),
            paths
        )
    }
}

Object.keys(TRANSFOMATIONS).forEach(trans => {
    Handlebars.registerHelper(trans, function (...args) {
        args.pop()
        return TRANSFOMATIONS[trans](...args)
    })
})

module.exports = {
    TransformConfig
}

// example about applyJson
let template = `{{ applyJson \"input_data\" (encryptPn \"__json_value__\") \"['$.phone_number']\" (encryptNId \"__json_value__\") \"['$.id_values[*]']\" }}`;
let compiledTemplate = Handlebars.compile(template);
console.log(compiledTemplate({})); // Outputs the transformed SQL expression

// example about encryptNId
template = `{{ encryptNId \"input_data\" }}`;
compiledTemplate = Handlebars.compile(template);
// console.log(compiledTemplate({})); // Outputs the transformed SQL expression
