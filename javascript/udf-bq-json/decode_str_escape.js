function decodeUnicodeEscape1(input) {
    return input.replace(/\\u([0-9a-fA-F]{4})/g, function(match, group1) {
      return String.fromCharCode(parseInt(group1, 16));
    });
  }

  function decodeUnicodeEscape(input) {
    let result = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '\\' && input[i + 1] === 'u' && i + 5 < input.length) {
            let hex = input.slice(i + 2, i + 6);
            if (/^[0-9a-fA-F]{4}$/.test(hex)) {
                result += String.fromCharCode(parseInt(hex, 16));
                i += 5;
            } else {
                result += input[i];
            }
        } else {
            result += input[i];
        }
    }
    return result;
}

let inputS = 'D\\u1ea1 em ch\\u00e0o ch\\u1ecb........ ch\\u1ecb L\\u01afU'
console.log(inputS)
console.log(decodeUnicodeEscape(inputS))