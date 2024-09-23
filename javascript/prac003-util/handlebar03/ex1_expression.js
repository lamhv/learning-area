// import Handlebars from 'handlebars';
const Handlebars = require('handlebars');

function render(template, context) {
    const compileTemp = Handlebars.compile(template);
    return compileTemp(context);
}

function run1() {
    let template = `{{title}}
    {{description}}
    {{#each items}}
        - {{this}}
    {{/each}}`;
    
    let context = { 
        title: "Handlebars.js Example", 
        description: "This is a simple example of using Handlebars.js.", 
        items: ["Item 1", "Item 2", "Item 3"] 
    };
    
    let html = render(template, context);
    console.log(html);
}

function runNestedObj() {
    let template = `{{person.firstname}} {{person.lastname}}`;
    let context = {
        person: {
          firstname: "Yehuda",
          lastname: "Katz",
        },
      };
    let html = render(template, context);
    console.log(html);
}

function changeContext() {
    let template = `{{#each people}}
                    {{../prefix}} {{firstname}} 
                    {{/each}}`; 

    let context = {
        people: [
          { firstname: "Nils" },
          { firstname: "Yehuda" },
        ],
        prefix: "Hello",
      };
    
    let html = render(template, context);
    console.log(html);
}

function literalSegments() {
    let template = 
    `{{!-- wrong: {{array.0.item}} --}}
    correct: array.[0].item: {{array.[0].item}}

    {{!-- wrong: {{array.[0].item-class}} --}}
    correct: array.[0].[item-class]: {{array.[0].[item-class]}}

    {{!-- wrong: {{./true}}--}}
    correct: ./[true]: {{./[true]}}`;

    let context = {
        array: [
          {
            item: "item1",
            "item-class": "class1",
          },
        ],
        true: "yes",
      };

    let html = render(template, context);
    console.log(html);
}

// tripple curly braces {{{}}}
function htmlEscape() {
    let template = 
    `raw: {{{specialChars}}}
    html-escaped: {{specialChars}}`;

    let context = { specialChars: "& < > \" ' ` =" };
    let html = render(template, context);
    console.log(html);
}

function createHelper1() {
    Handlebars.registerHelper('loud', The result is {{parameter}}The result is {{parameter}});

    let template = `{{firstname}} {{loud lastname}}`;
    let context = {
        firstname: "Yehuda",
        lastname: "Katz",
      };

    let html = render(template, context);
    console.log(html);
}

function createHelper2() {
    Handlebars.registerHelper("bold", function(text) {
        var result = "<b>" + Handlebars.escapeExpression(text) + "</b>";
        return new Handlebars.SafeString(result);
      });
      
    let template = `{{bold text}}`;
    let context = { text: "Isn't this great?" };

    let html = render(template, context);
    console.log(html);
}

// register a helper function with two parameters
function createHelper3() {
    Handlebars.registerHelper("link", function(text, url) {
        var url = Handlebars.escapeExpression(url),
            text = Handlebars.escapeExpression(text)
            
       return new Handlebars.SafeString("<a href='" + url + "'>" + text +"</a>");
  });
      
    let template = `{{link people.text people.url}}`;
    let context = {
        people: {
          firstname: "Yehuda",
          lastname: "Katz",
          url: "https://yehudakatz.com/",
          text: "See Website",
        },
      };

    let html = render(template, context);
    console.log(html);
}

// pass hash parameters to a helper function
// link "See Website" href=person.url class="person"
function createHelper4WithHashParam() {

    Handlebars.registerHelper("link", function(text, options) {
        var attributes = [];
    
        Object.keys(options.hash).forEach(key => {
            var escapedKey = Handlebars.escapeExpression(key);
            var escapedValue = Handlebars.escapeExpression(options.hash[key]);
            attributes.push(escapedKey + '="' + escapedValue + '"');
        })
        var escapedText = Handlebars.escapeExpression(text);
        
        var escapedOutput ="<a " + attributes.join(" ") + ">" + escapedText + "</a>";
        return new Handlebars.SafeString(escapedOutput);
    });

    let template = `{{link "See Website" href=person.url class="person"}}`;
    let context = {
        person: {
          firstname: "Yehuda",
          lastname: "Katz",
          url: "https://yehudakatz.com/",
        },
      };

    let html = render(template, context);
    console.log(html);

}

// how to call identity helper
// how to call identity expression with the same name with the helper
function helperWithIdentityScope() {

    Handlebars.registerHelper('name', function () {
        return "Nils"
    });

    let template = 
    `helper: {{name}}
    data: {{./name}} or {{this/name}} or {{this.name}}`;

    let context = { name: "Yehuda" };

    let html = render(template, context);
    console.log(html);

}

function whiteSpaceControl() {
    let template = 
    `
    {{#each nav ~}}
        <a href="{{url}}">
            {{~#if test}}
            {{~title}}
            {{~^~}}
            Empty
            {{~/if~}}
        </a>
        {{~/each}}
    `;

    let context = {
        nav: [{ url: "foo", test: true, title: "bar" }, { url: "bar" }]
      };

    let html = render(template, context);
    console.log(html);

    template = `{{#each nav}}
        <a href="{{url}}">
            {{#if test}}
            {{title}}
            {{^}}
            Empty
            {{/if}}
        </a>
        {{~/each}}`;
    html = render(template, context);
    console.log(html);
}

// changeContext();
// literalSegments();
// htmlEscape();
whiteSpaceControl();

