const {
    TABLE_ARR
} = require('./merge_util.js');

console.log(TABLE_ARR);

TABLE_ARR.forEach(table => {
    let primaryKeyArr = table.primaryKey.split(',').map(pK => `\`replica\`.\`${pK.trim()}\` = \`changelog\`.\`${pK.trim()}\``);
    const mergeJoinClause = `'${primaryKeyArr.join(' AND ')}'`;

    let deleteClause = table.ignoreDel ? '': `WHEN MATCHED AND changelog.__deleted = 'true' THEN DELETE`;

    let sql = 
    `
    MERGE 'xxx_replica' AS replica 
    USING ( SELECT * FROM 'xxx_changelog' ) AS changelog 
    ON %s AND (
        %s
    )
    ${deleteClause}
    WHEN MATCHED AND changelog.__deleted = 'false' THEN %s
    WHEN NOT MATCHED BY TARGET AND changelog.__deleted = 'false' THEN %s 
    `;
    console.log(sql);
});
