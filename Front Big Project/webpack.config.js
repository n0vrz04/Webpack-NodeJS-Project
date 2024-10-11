import * as path from 'path';
// const path = require('path');

import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const config = {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        path: path.resolve(_dirname, "bundles"),
        filename: "bundle.js"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    devServer: {
        port: 3200,
        static: {
            directory: path.join(_dirname, "public")
        }
    }
};

export default config;