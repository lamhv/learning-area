function TableInfo(name, reParCol, chParCol, primaryKey, orderKey, unitTime, interval) {
    this.tableName = name;
    this.reParCol = reParCol;
    this.chParCol = chParCol;
    this.primaryKey = primaryKey;
    this.orderKey = orderKey;
    this.unitTime = unitTime;
    this.interval = interval;
}

let jsonString = `[{
    "table_name": "campaign",
    "replica_partition_col": "segments_date",
    "changelog_partition_col": "created_at",
    "primary_key": "campaign_id, customer_id, segments_date",
    "order_key": "created_at",
    "unit_time": "DAY",
    "interval_unit": "1"
  }, {
    "table_name": "ad_group_ad",
    "replica_partition_col": "segments_date",
    "changelog_partition_col": "created_at",
    "primary_key": "ad_group_ad_ad_id, ad_group_id, customer_id, campaign_id, segments_date",
    "order_key": "created_at",
    "unit_time": "DAY",
    "interval_unit": "1"
  }, {
    "table_name": "ad_group",
    "replica_partition_col": "segments_date",
    "changelog_partition_col": "created_at",
    "primary_key": "ad_group_id, customer_id, campaign_id, segments_date",
    "order_key": "created_at",
    "unit_time": "DAY",
    "interval_unit": "1"
  }, {
    "table_name": "keyword_view",
    "replica_partition_col": "segments_date",
    "changelog_partition_col": "created_at",
    "primary_key": "ad_group_criterion_keyword_text, ad_group_criterion_keyword_match_type, ad_group_criterion_criterion_id, campaign_id, customer_id, ad_group_id, segments_date",
    "order_key": "created_at",
    "unit_time": "DAY",
    "interval_unit": "1"
  }]`

let jsonArr = JSON.parse(jsonString);
let tableArr = [];
jsonArr.forEach(jsonEle => {
    tableArr.push(new TableInfo(jsonEle.table_name, jsonEle.replica_partition_col, jsonEle.changelog_partition_col,
        jsonEle.primary_key, jsonEle.order_key, jsonEle.unit_time, jsonEle.interval_unit));
});

tableArr.forEach(ele => {
    console.log(ele)
})

let orderKeyStr = "id, created_at";
let orderKeyArr = orderKeyStr.split(",").map(tableName => tableName.trim() + " DESC");
console.log(orderKeyArr.join(', '));


let primaryKeyStr = "id, created_at";
let primaryKeyArr = primaryKeyStr.split(",").map(pK => `\`replica\`.\`${pK.trim()}\` = \`changelog\`.\`${pK.trim()}\``);
console.log(primaryKeyArr.join(' AND '));