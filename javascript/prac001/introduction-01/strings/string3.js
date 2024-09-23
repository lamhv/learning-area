const dbType = 'zmysql'

function getX() {
    if (dbType.toLowerCase() === 'mysql') {
        return 'right';
    } else {
        return 'wrong';
    }
}

let rs = getX()
console.log(rs)

