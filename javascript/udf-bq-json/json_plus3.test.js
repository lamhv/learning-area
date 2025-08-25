const { JSONPath } = require('jsonpath-plus');

const json = {
    store: {
        book: [
            {
                category: "reference",
                author: "Nigel Rees",
                title: "Sayings of the Century",
                price: 8.95
            },
            {
                category: "fiction",
                author: "Evelyn Waugh",
                title: "Sword of Honour",
                price: 12.99
            }
        ],
        bicycle: {
            color: "red",
            price: 19.95
        }
    }
};

describe('jsonpath-plus', () => {
    it('should remove all price properties', () => {
        JSONPath({
            json,
            path: '$..price',
            callback: (value, type, payload) => {
                const pathArr = JSONPath.toPathArray(payload.path);
                let ref = json;
                for (let i = 1; i < pathArr.length - 1; i++) {
                    ref = ref[pathArr[i]];
                }
                delete ref[pathArr[pathArr.length - 1]];
            }
        });

        console.log(json);
    });
})