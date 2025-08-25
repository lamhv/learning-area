const {JSONPath} = require('jsonpath-plus')
const assert = require('assert');

const json = {
    "store": {
        "book": [
            {
                "category": "reference",
                "author": "Nigel Rees",
                "title": "Sayings of the Century",
                "price": 8.95
            },
            {
                "category": "fiction",
                "author": "Evelyn Waugh",
                "title": "Sword of Honour",
                "price": 12.99
            },
            {
                "category": "fiction",
                "author": "Herman Melville",
                "title": "Moby Dick",
                "isbn": "0-553-21311-3",
                "price": 8.99
            },
            {
                "category": "fiction",
                "author": "J. R. R. Tolkien",
                "title": "The Lord of the Rings",
                "isbn": "0-395-19395-8",
                "price": 22.99
            }
        ],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    }
};

describe('jsonpath-plus', () => {
    it('should select all books', () => {
        const result = JSONPath({json, path: '$.store.book[*]', resultType: 'all'});
        assert(result.length, 4)
    });

    it('should select books with price less than 10', () => {
        const result = JSONPath({json, path: '$.store.book[?(@.price < 10)]', resultType: 'all'});
        expect(result.length).toBe(2);
    });

    it('should select authors of fiction books', () => {
        const result = JSONPath({json, path: '$.store.book[?(@.category == "fiction")].author', resultType: 'all'});
        expect(result.length).toBe(3);
    });

    it('should select the color of the bicycle', () => {
        const result = JSONPath({json, path: '$.store.bicycle.color', resultType: 'value'});
        expect(result).toStrictEqual(['red']);
    });

    it('get authors of all books', () => {
        const result = JSONPath({json, path: '$.store.book[*].author', resultType: 'all'});
        console.log(JSONPath.toPathArray(result[0].path));
        expect(result.length).toBe(4);
    })

    it('get all authors', () => {
        const result = JSONPath({json, path: '$..author', resultType: 'all'});
        console.log(JSONPath.toPathArray(result[0].path));
        expect(result.length).toBe(4);
    })

    it('get all things in store', () => {
        const result = JSONPath({json, path: '$.store.*', resultType: 'all'});
        console.log(result);
    })

    // $.store..price: get all price in store
    // $..book[2]: get the third book
    // $..book[(@.length-1)] = $..book[-1:]: the last book in order
    // $..book[0,1] = $..book[:2]: the first two books
    // $..book[?(@.isbn)]: filter all book having isbn
    // $..book[?(@.price<10)]: filter all book having price < 10
    // $..*[?(@property === 'price' && @ !== 8.95)]: get all value of "price" property that is not equal 8.95

    // $..: get all json elements
    // $..*: get all text include json elements
    // $..[?(@.price>19)]^: get parent of element having price > 19
    // $.store.*~: get property name of sub-object of store
    // $..book[?(@parent.bicycle && @parent.bicycle.color === "red")].category


    it('get all properties 1', () => {
        const result = JSONPath({json, path: '$..*[?(@property === \'price\' && @ !== 8.95)]', resultType: 'all'});
        console.log(result);
    })

    it('get all text in recursive', () => {
        const result = JSONPath({json, path: '$..*', resultType: 'all'});
        console.log(result);
    })

    it('get parent element', () => {
        const result = JSONPath({json, path: '$..[?(@.price>19)]^', resultType: 'all'});
        console.log(result);
    })

    it('get property names', () => {
        const result = JSONPath({json, path: '$.store.*~', resultType: 'all'});
        console.log(result);
    })

    it('get book with filter json path', () => {
        const result = JSONPath({json, path: "$.store.book[?(@path !== \"$['store']['book'][0]\")]", resultType: 'all'});
        console.log(result);
    })

    it('get all elements of child book, exclude property is category', () => {
        const result = JSONPath({json, path: '$..book.*[?(@property !== "category")]', resultType: 'all'});
        console.log(result);
    })

    it('get all book exclude the first one', () => {
        const result = JSONPath({json, path: '$..book[?(@property !== 0)]', resultType: 'all'});
        console.log(result);
    })

    it('get grandchildren of store v1', () => {
        const result = JSONPath({json, path: '$.store[*][?(@parentProperty !== "book")]', resultType: 'all'});
        console.log(result);
    })

    // @parentProperty in this case is property / key of json.
    it('get grandchildren of store', () => {
        const result = JSONPath({json, path: '$.store.*[?(@parentProperty !== "book")]', resultType: 'all'});
        console.log(result);
    })

    // @parentProperty in this case is index of array
    it('get the property values of all book', () => {
        const result = JSONPath({json, path: '$..book.*[?(@parentProperty !== 0)]', resultType: 'all'});
        console.log(result);
    })

    it('get the numeric values within the book array', () => {
        const result = JSONPath({json, path: '$..book..*@number()', resultType: 'all'});
        console.log(result);
    })


    it('get xx', () => {
        const result = JSONPath({json, path: '$..book.*[?(@property.match(/bn$/i))]^', resultType: 'all'});
        console.log(result);
    })

});

const JSON_STRING_FILTER_BY_KEY =
    { "abc_card_number": "abc", "b": { "b_card_number": "b", "c": [ { "c_card_number": "c" }, { "c1_card_number": "c1", "c2_card_number": "c2" } ] } }

describe('JSONPath', () => {
    it('get 11', () => {
        const result = JSONPath({json: JSON_STRING_FILTER_BY_KEY, path: '$..*[?(@property.match(/number$/i))]', resultType: 'all'});
        console.log(result);
    })
});

