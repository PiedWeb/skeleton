var Encore = require('@symfony/webpack-encore');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const rootImport = require('babel-plugin-root-import');
require('webpack');

Encore
    .setOutputPath('public/assets')
    .setPublicPath('/assets')
    .cleanupOutputBeforeBuild()
    .enableSassLoader()
    .disableSingleRuntimeChunk()
    .enableVersioning(true)
    .addEntry('app', './assets/main.js')
    .addPlugin(new webpack.ProvidePlugin(new UglifyJSPlugin()))
    .configureFilenames({
         js: '[name].js',
         css: '[name].css',
         images: 'img/[name].[ext]',
         fonts: 'fonts/[hash:8].[name].[ext]'
    })
;

if (Encore.isProduction()) {
     //Encore.setPublicPath('https://static.myserver.com/');
     //Encore.setManifestKeyPrefix('build/');
}

const mainConfig = Encore.getWebpackConfig();
mainConfig.name = 'main';

Encore.reset();

Encore
    .setOutputPath('public/assets')
    .setPublicPath('/assets')
    .addEntry('logo_title.png', './node_modules/piedweb-devoluix-theme/src/img/logo_title.png')
    .copyFiles({
        from: './node_modules/piedweb-devoluix-theme/src/img',
        pattern: /.*title\.(png|jpg|jpeg)$/
    })
    .enableVersioning(false)
;

const adminConfig = Encore.getWebpackConfig();
adminConfig.name = 'adminConfig';

module.exports = [mainConfig, adminConfig];
