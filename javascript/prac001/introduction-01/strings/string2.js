let str = "user_translations, email_stats, event_logs";
str.split(",").forEach(table => {
    let tmpStr = table;
    console.log("Table name: " + tmpStr);
})

let arrayStr = str.split(",").map(tableName => tableName.trim())
console.log(arrayStr)

let convertArray = arrayStr.map(table => '\'' + table + '\'')
console.log(convertArray.join(", "))