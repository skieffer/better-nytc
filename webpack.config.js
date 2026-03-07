const CopyWebpackPlugin = require("copy-webpack-plugin");
const path_resolver = require('path');

module.exports = env => {
    const args = env || {};
    const chrome = !!args.chr;

    return {
        entry: {
            othergames: './src/othergames.js',
            options: './src/options/options.js',
            background: './src/background.js',
        },
        output: {
            path: path_resolver.resolve(
                __dirname,
                chrome ? 'dist-chrome' : 'dist-mozilla'
            ),
            filename: pathData => {
                return pathData.chunk.name === 'options' ? '[name]/[name].js' : '[name].js';
            },
        },
        mode: 'development',
        // According to [this](https://github.com/webpack/webpack/issues/4899#issuecomment-609737316),
        // setting `devtool: 'source-map'` is the way to prevent `eval` in the packed JS.
        // We can't have `eval`, since it is not allowed in browser extensions.
        // I'm using 'inline-source-map' instead because plain 'source-map' won't seem to show up in Chrome devtools.
        devtool: 'inline-source-map',
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        context: "src",
                        from: "options",
                        to: "options"
                    },
                    {
                        context: "src",
                        from: "betternytc.css",
                        to: "betternytc.css"
                    },
                    {
                        context: "src",
                        from: "betternytc.js",
                        to: "betternytc.js"
                    },
                    {
                        context: "src",
                        from: "othergames.css",
                        to: "othergames.css"
                    },
                    {
                        context: "src",
                        from: chrome ? "manifest.chrome.json" : "manifest.mozilla.json",
                        to: "manifest.json",
                        transform: (content, path) => {
                            const manifest = JSON.parse(content.toString());
                            // Add version number from package.json to manifest.json, so we don't have to repeat ourselves.
                            manifest.version = require("./package.json").version;
                            return JSON.stringify(manifest, null, 2);
                        },
                    },
                ]
            }),
        ],
        performance: {
            hints: false
        },
    };
};
