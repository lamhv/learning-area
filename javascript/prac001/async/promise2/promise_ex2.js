const url = "https://jsonmock.hackerrank.com/api/movies";

fetch(url).then(res => {
    return res.json();
}).then(data => {
    console.log('DATA: ', data);
})