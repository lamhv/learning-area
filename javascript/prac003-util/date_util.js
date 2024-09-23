// function getDates(start, end) {
//     let arr=[];
//     for(let dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
//         arr.push(new Date(dt));
//     }
//     return arr;
// };

function convertDate(dateStr) {
    console.log(dateStr.substring(6, 8));
    const year = parseInt(dateStr.substring(0, 4));
    const monthIndex = parseInt(dateStr.substring(4, 6)) - 1; // Month is 0-indexed
    const day = parseInt(dateStr.substring(6, 8));

    return new Date(year, monthIndex, day);
}

function convertDate1(dateStr) {
    const year = dateStr.substring(0, 4)
      const month = dateStr.substring(4, 6)
      const day = dateStr.substring(6, 8)
      return new Date(`${year}-${month}-${day}`)
}

function getDatesWithyyyyMMdd(start, end) {
    let arr=[];
    let startDate = convertDate1(start);
    console.log(startDate);

    let endDate = convertDate1(end);
    console.log(endDate);

    for(let dt = startDate; dt<=endDate; dt.setDate(dt.getDate()+1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

// let dateArray = getDates('2023-02-01', '2023-02-03');
// for(let i = 0; i < dateArray.length; i++) {
//     console.log(dateArray[i].toISOString().slice(0,10));
// }



// let dateArray = getDatesWithyyyyMMdd('20230201', '20230203');
// for(let i = 0; i < dateArray.length; i++) {
//     console.log(dateArray[i].toISOString().slice(0,10));
// }

// console.log(dateArray);

let jsonString = `[{ 
    "table_name": "quickstart_testmap", 
    "min_date": "20231218",
    "max_date": "20231219"
  }, {
    "table_name": "test_partitioned_table",
    "min_date": "20230501",
    "max_date": "20230502"
  }]`;

function TableInfo(name, minDate, endDate) {
    this.tableName = name;
    this.dateArray = getDatesWithyyyyMMdd(minDate, endDate);
    this.partitionCol = "created_at";
}

let jsonArr = JSON.parse(jsonString);
let tableArr = [];
jsonArr.forEach(jsonEle => {
    console.log(jsonEle.min_date);
    console.log(jsonEle.max_date);

    tableArr.push(new TableInfo(jsonEle.table_name, jsonEle.min_date, jsonEle.max_date));
});

const customPartitionColMap = new Map([
    ["quickstart_testmap", "aaaa"]
  ]);

tableArr.forEach(table => {
    console.log(table.tableName);
    console.log(table.dateArray);

    console.log(customPartitionColMap.has(table.tableName)? customPartitionColMap.get(table.tableName): table.partitionCol);
})