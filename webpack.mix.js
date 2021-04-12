const mix = require('laravel-mix');

let template = 'classic';

mix.js('resources/js/app.js', 'public/js');
mix.js('resources/js/Shop/shop.js', 'public/js');
mix.sass('resources/sass/' + template + '/app.scss', 'public/css').options({ processCssUrls: false });
mix.sass('resources/sass/' + template + '/fonts.scss', 'public/css');
mix.sass('resources/sass/' + template + '/base.scss', 'public/css').options({ processCssUrls: false });

mix.sass('resources/sass/' + template + '/auth.scss', 'public/css');
mix.sass('resources/sass/' + template + '/shop.scss', 'public/css');

mix.copyDirectory('resources/sass/documents', 'public/css/documents');
mix.copyDirectory('resources/fonts', 'public/fonts');
mix.copyDirectory('resources/images', 'public/images');
mix.copyDirectory('resources/sounds', 'public/sounds');
mix.copyDirectory('resources/modules/dependencies', 'public/dependencies');

if( !mix.inProduction() ) {
    mix.webpackConfig({
        devtool:"inline-source-map",
    });
    mix.sourceMaps();
}

if(mix.inProduction() ) {
    mix.minify('public/js/app.min.js');
    mix.minify('public/css/app.css');
    mix.minify('public/css/base.css');
    mix.version();
}

////////

// mix.options({
//     hmrOptions: {
//         host: 'online.autocrm',  // site's host name
//         port: 8080,
//     }
// });

// // fix css files 404 issue
// mix.webpackConfig({
//     // add any webpack dev server config here
//     devServer: {
//         proxy: {
//             host: '127.0.0.1',  // host machine ip
//             port: 8080,
//         },
//         watchOptions:{
//             aggregateTimeout:200,
//             poll:5000
//         },
//
//     }
// });
