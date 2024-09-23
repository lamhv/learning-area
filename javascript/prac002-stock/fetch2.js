fetch('./hpg.html')
.then(response => response.text()) 
.then(textString => {
    console.log(textString);
});