

const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

console.log(fetchPromise);

fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
});

console.log("Started request…");

// chain promises
const fetchPromiseChain = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromiseChain
    .then((response) => response.json())
    .then((data) => {
        console.log(data[0].name);
    });

// catching errors
const fetchPromiseError = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromiseError
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data[0].name);
    })
    .catch((error) => {
        console.error(`Could not get products: ${error}`);
    });


// combining multiple promises
let fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
let fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
let fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((responses) => {
        for (const response of responses) {
            console.log(`${response.url}: ${response.status}`);
        }
    })
    .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
    });

// combining multiple promises continues

fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
fetchPromise3 = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((responses) => {
        for (const response of responses) {
            console.log(`${response.url}: ${response.status}`);
        }
    })
    .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
    });