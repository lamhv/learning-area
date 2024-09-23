// templates.js

const templates = {
    example: `
        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <ul>
            {{#each items}}
                <li>{{this}}</li>
            {{/each}}
        </ul>
    `
};