// const url = "https://vn.tradingview.com/symbols/HOSE-HPG/financials-balance-sheet/?selected=&statements-period=FY";
const url = 'hpg.html';

fetch(url)
.then(response => {
    if(!response.ok) {
        throw new Error(`Http error: ${response.status}`);
    }

    console.log(response);

    return response.text();
})
.then(text => handle(text))
.catch(err => console.error(`Fetch problem: ${err}`));

function handle(text) {
    console.log("done: " + text);
}