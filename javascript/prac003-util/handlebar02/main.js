// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Step 1: Get the template string from templates.js
    const source = templates.example;

    // Step 2: Compile the template
    const template = Handlebars.compile(source);

    // Step 3: Define the data
    const context = {
        title: "Handlebars.js Example",
        description: "This is a simple example of using Handlebars.js.",
        items: ["Item 1", "Item 2", "Item 3"]
    };

    // Step 4: Render the template with the data
    const html = template(context);

    // Step 5: Insert the rendered HTML into the DOM
    document.getElementById('content').innerHTML = html;
});