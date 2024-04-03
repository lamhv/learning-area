// synchronous functions
function doStepSync1(init) {
    return init + 1;
}

function doStepSync2(init) {
    return init + 2;
}

function doStepSync3(init) {
    return init + 3;
}

function doOperationSync() {
    let result = 0;
    result = doStepSync1(result);
    result = doStepSync2(result);
    result = doStepSync3(result);
    console.log(`result: ${result}`);
}

doOperationSync();

// asynchronous functions: using callback
// A callback is just a function that's passed into another function, 
// with the expectation that the callback will be called at the appropriate time
function doStep1(init, callback) {
    const result = init + 1;
    callback(result);
}

function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
}

function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
}

function doOperation() {
    doStep1(0, (result1) => {
        doStep2(result1, (result2) => {
            doStep3(result2, (result3) => {
                console.log(`result: ${result3}`);
            });
        });
    });
}

doOperation();