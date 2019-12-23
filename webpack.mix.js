const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/template.scss', 'public/css');

// mix.copyDirectory('resources/fonts', 'public/fonts')
mix.copyDirectory('resources/images', 'public/images');

if( !mix.inProduction() ) {
    mix.webpackConfig({
        devtool:"inline-source-map",
    });
    mix.sourceMaps();
}

if(mix.inProduction() ) {

    mix.minify('public/js/app.min.js');
    mix.version();
}
