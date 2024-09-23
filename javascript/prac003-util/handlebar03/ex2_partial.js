const Handlebars = require('handlebars');

function render(template, context) {
    const compileTemp = Handlebars.compile(template);
    return compileTemp(context);
}

function makePartial() {
    Handlebars.registerPartial('myPartial', '{{prefix}}');

    let template = `{{> myPartial }}`;
    
    let context = { prefix: "Hello" };
    
    let html = render(template, context);
    console.log(html);
}

function makeDynamicPartial() {
    Handlebars.registerHelper('whichPartial', function(context, options) { return 'dynamicPartial' });
    Handlebars.registerPartial('dynamicPartial', 'Dynamo!');

    let template = `{{> (whichPartial) }}`;
    
    let context = null;
    
    let html = render(template, context);
    console.log(html);
}

// partial with custom context
function makePartialCusContext() {
    Handlebars.registerPartial('myPartial', '{{information}}');

    let template = `{{> myPartial myOtherContext }}`;
    
    let context = {
        myOtherContext: {
          information: "Interesting!",
        },
      };
    
    let html = render(template, context);
    console.log(html);
}

// partial with hash parameters
function makePartialParm1() {
    Handlebars.registerPartial('myPartial', 'The result is {{parameter}}');

    let template = `{{> myPartial parameter=favoriteNumber }}`;
    
    let context = { favoriteNumber: 123 };
    
    let html = render(template, context);
    console.log(html);
}

// pass parameters to partials
function makePartialParm2() {
    Handlebars.registerPartial('myPartial', '{{prefix}}, {{firstname}} {{lastname}}');

    let template = 
    `
    {{#each people}}
    {{> myPartial prefix=../prefix firstname=firstname lastname=lastname}}.
    {{/each}}
    `;
    
    let context = {
        people: [
          {
            firstname: "Nils",
            lastname: "Knappmeier",
          },
          {
            firstname: "Yehuda",
            lastname: "Katz",
          },
        ],
        prefix: "Hello",
      };
    
    let html = render(template, context);
    console.log(html);
}

function makePartialBlock1() {
    // Handlebars.registerPartial('myPartial', '{{prefix}}, {{firstname}} {{lastname}}');
    let template = 
    `
    {{#> myPartial }}
    Failover content
    {{/myPartial}}
    `;
    
    let context = null;
    
    let html = render(template, context);
    console.log(html);
}

// how to pass partial block content to partial
// using @partial-block
function makePartialBlock2() {
    Handlebars.registerPartial('layout', 'Site Content {{> @partial-block }}');
    let template = 
    `
    {{#> layout }}
    My Content
    {{/layout}}
    `;
    
    let context = null;
    
    let html = render(template, context);
    console.log(html);
}

// need no partial register
// call partial way/function in template
function makePartialBlock3() {
    
    let template = 
    `
    {{#each people as |person|}}
    {{#> childEntry}}
        {{person.firstname}}
    {{/childEntry}}
    {{/each}}
    `;
    
    let context = {
        people: [
          { firstname: "Nils" },
          { firstname: "Yehuda" },
          { firstname: "Carl" },
        ],
      };
    
    let html = render(template, context);
    console.log(html);
}

// create partial function inside template
function makePartialInline1() {
  let template = 
    `
    {{#*inline "myPartial"}}
      My Content
    {{/inline}}
    {{#each people}}
      {{> myPartial}}
    {{/each}}
    `;
    
    let context = {
        people: [
          { firstname: "Nils" },
          { firstname: "Yehuda" },
          { firstname: "Carl" },
        ],
      };
    
    let html = render(template, context);
    console.log(html);
}

function makePartialInline2() {
  Handlebars.registerPartial('layout', 
    `<div class="nav">
      {{> nav}}
    </div>
    <div class="content">
      {{> content}}
    </div>
    `);

  let template = 
    `
    {{#> layout}}
      {{#*inline "nav"}}
        My Nav
      {{/inline}}
      {{#*inline "content"}}
        My Content
      {{/inline}}
    {{/layout}}
    `;
    
    let context = null;
    
    let html = render(template, context);
    console.log(html);
}

makePartialInline2();