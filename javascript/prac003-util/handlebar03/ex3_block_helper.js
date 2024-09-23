const Handlebars = require('handlebars');

function render(template, context) {
    const compileTemp = Handlebars.compile(template);
    return compileTemp(context);
}

// can pass the whole content block to the helper
function makeBasicBlockHelper1() {
    Handlebars.registerHelper('bold', function(options) {
        return new Handlebars.SafeString('<div class="mybold">' + options.fn(this) + "</div>");
    });

    let template = `{{#bold}}Hello{{/bold}}`;

    console.log(Handlebars.compile(template)())
}

// can pass the whole content block ({{body}}) to the helper 'noop'
function makeBasicBlockHelper2() {
    Handlebars.registerHelper("noop", function(options) {
        // return options.fn(this);
        return new Handlebars.SafeString('<div class="mynoop">' + options.fn(this) + "</div>");
      });

    let template = 
    `
    <div class="entry">
        <h1>{{title}}</h1>
        <div class="body">
            {{#noop}}{{body}}{{/noop}}
        </div>
    </div>
    `;

    let context = {
        "title": "My New Post",
        "body": "This is my first post!"
    }

    console.log(Handlebars.compile(template)(context))
}

function makeWithBlockHelper() {
    let template = 
    `
    <div class="entry">
    <h1>{{title}}</h1>
    {{#with story}}
        <div class="intro">{{{intro}}}</div>
        <div class="body">{{{body}}}</div>
    {{/with}}
    </div>
    `;

    let context = {
        title: "First Post",
        story: {
          intro: "Before the jump",
          body: "After the jump"
        }
      };

    let html = render(template, context);
    console.log(html);
}

// define register function "withhhh" ... the same as "with" above
function makeWithBlockHelperTheSame() {
    Handlebars.registerHelper("withhhh", function(context, options) {
        return options.fn(context);
      });

    let template = 
    `
    <div class="entry">
    <h1>{{title}}</h1>
    {{#withhhh story}}
        <div class="intro">{{{intro}}}</div>
        <div class="body">{{{body}}}</div>
    {{/withhhh}}
    </div>
    `;

    let context = {
        title: "First Post",
        story: {
          intro: "Before the jump",
          body: "After the jump"
        }
      };

    let html = render(template, context);
    console.log(html);
}
makeBasicBlockHelper2();