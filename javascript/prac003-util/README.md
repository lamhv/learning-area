# Util

## Switch to newer node version using node version manager (NVM)

Usage:
nvm install [version]        # Download and install [version]
nvm uninstall [version]      # Uninstall [version]
nvm use [version]            # Switch to use [version]
nvm list                     # List installed versions

## HandlerBar03

### 1. Initialize Project (if not already initialized):

```sh
npm init -y
```

### 2. Install Webpack, Webpack CLI, and Babel Loader:

```sh
npm install webpack webpack-cli babel-loader @babel/core @babel/preset-env --save-dev
```

### 3. Create Webpack Configuration (`webpack.config.js`):

```javascript
const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
```

### 4. Create Babel Configuration (`.babelrc`):

```json
{
  "presets": ["@babel/preset-env"]
}
```

### 5. Add a Build Script to `package.json`:

```json
"scripts": {
    "build": "webpack"
}
```

### 6. Run the Build Script:

```sh
npm run build
```