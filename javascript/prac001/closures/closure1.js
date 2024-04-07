// global scope
if (Math.random() > 0.5) {
    var x = 1;
  } else {
    var x = 2;
  }
  console.log(x);

  // block-scope
  if (Math.random() > 0.5) {
    const y = 1;
  } else {
    const y = 2;
  }
  console.log(y); // ReferenceError: x is not defined
  