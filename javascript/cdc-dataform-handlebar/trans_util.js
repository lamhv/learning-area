const Handlebars = require('handlebars');

function TransformConf(transObject) {
    this.transforms = {}
    this.jsonTransClause = {}
    Object.keys(transObject).forEach(field => {
        const fieldInfo = transObject[field]
        const applyTrans = Handlebars.compile(fieldInfo.trans)(fieldInfo.params)
        this.transforms[field] = `${applyTrans} AS ${field}`
        if(fieldInfo.trans.includes('jsonTrans') && fieldInfo.params && fieldInfo.params.jsonTransform) {
            this.jsonTransClause[field] = getJsonTransClause(fieldInfo.params.jsonTransform)
        }
    })
}

function getJsonTransClause(jsonTransform) {
    return {
        mapping: `mapping_${jsonTransform.field}`,
        originalField: `${jsonTransform.field} AS original_${jsonTransform.field}`,
        joinExpr: `UNNEST(
            JSON_EXTRACT_ARRAY(
                PARSE_JSON(fns.extractJson(${jsonTransform.field}, ${jsonTransform.paths}))
            )
        ) mapping_${jsonTransform.field}`
    }
}

const TRANSFOMATIONS = {
    phoneNumberTrans: function(field, code = '\'VN\'', formatType = '\'E164\'') {
        return new Handlebars.SafeString(
            `fns.formatPhoneNumber(${field}, ${code}, ${formatType})`
        )
    },
    legacyPhoneNumberTrans: function(field, code = '\'VN\'') {
        return new Handlebars.SafeString(
            `fns.legacyFormatPhoneNumber(${field}, ${code})`
        )
    },
    encryptTrans: function(field) {
        return new Handlebars.SafeString(
            `fns.encrypt(${field})`
        )
    },
    validateStringField: function(field, elseResult) {
        return new Handlebars.SafeString(
            `IF(
                ${field} IS NULL OR LENGTH(TRIM(${field})) \= 0, 
                ${field}, 
                ${elseResult}
            )`
        )
    },
    jsonTrans: function(field, trans) {
        const mapping = `mapping_${field}`
        trans = String(trans).replaceAll('holeField', `JSON_VALUE(${mapping}, '\$.value')`)
        return new Handlebars.SafeString(
            `fns.setJson(
                original_${field}, 
                TO_JSON_STRING(
                    ARRAY_AGG(
                        JSON_SET(
                            ${mapping}, 
                            '$.value', ${trans}
                        )
                    )
                )
            )`
        )
    },
    link: function(text, url, code = '\'VN\'') {
        var url = Handlebars.escapeExpression(url),
        text = Handlebars.escapeExpression(text)
            
       return new Handlebars.SafeString("<a href='" + url + "'>" + text + ", code=" + code.name +"</a>");
    }
}

// Object.keys(TRANSFOMATIONS).forEach(trans => {
//     Handlebars.registerHelper(trans, TRANSFOMATIONS[trans]);
// });

Object.keys(TRANSFOMATIONS).forEach(trans => {
    Handlebars.registerHelper(trans, function(...args) {
        // console.log("trans_" + trans + ":" + args)
        args.pop()
        return TRANSFOMATIONS[trans](...args)
    })
})

let template = `{{link people.text people.url}}`;
let context = {
        people: {
            firstname: "Yehuda",
            lastname: "Katz",
            url: "https://yehudakatz.com/",
            text: "See Website",
            code: "India"
        }
    };
console.log(Handlebars.compile(template)(context));

module.exports = {
    TransformConf
}