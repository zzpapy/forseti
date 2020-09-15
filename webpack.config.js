var Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */

    //.addEntry('page1', './assets/js/page1.js')
    //.addEntry('page2', './assets/js/page2.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    //.enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    .autoProvidejQuery()

    // JQuery
    .addEntry('grandin_jquery', './assets/grandin_theme/vendors/bower_components/jquery/dist/jquery.min.js')

    // Bootstrap Core Js
    .addEntry('grandin_bootstrap', './assets/grandin_theme/vendors/bower_components/bootstrap/dist/js/bootstrap.min.js')
    .addEntry('grandin_bootstrap_jasny', './assets/grandin_theme/vendors/bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js')

    // Datatable
    .addEntry('grandin_datatable', './assets/grandin_theme/vendors/bower_components/datatables/media/js/jquery.dataTables.min.js')
    .addEntry('grandin_datatabletheme', './assets/grandin_theme/js/dataTables-data.js')

    // Slimscroll
    .addEntry('grandin_slimscroll', './assets/grandin_theme/js/jquery.slimscroll.js')

    // Switchery
    .addEntry('grandin_switchery', './assets/grandin_theme/vendors/bower_components/switchery/dist/switchery.min.js')

    // Fancy Dropdown
    .addEntry('grandin_fancydropdown', './assets/grandin_theme/js/dropdown-bootstrap-extended.js')

    // Form Wizard JavaScript
    .addEntry('grandin_formwizard', './assets/grandin_theme/vendors/bower_components/jquery.steps/build/jquery.steps.min.js')
    .addEntry('grandin_ajax_jqueryvalidata', './assets/grandin_theme/js/jquery.validate.min.js')

    // Form Wizard Data JavaScript
    .addEntry('grandin_formwizard_data', './assets/grandin_theme/js/form-wizard-data.js')

    // Bootstrap Touchspin JavaScript -->
    .addEntry('grandin_bootstrap_touchspin', './assets/grandin_theme/vendors/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js')

    // Starrr JavaScript
    .addEntry('grandin_starrr', './assets/grandin_theme/js/starrr.js')
    // Init
    .addEntry('grandin_init', './assets/grandin_theme/js/init.js')

    .addEntry('app', './assets/js/app.js')

    // Custom js
    .addEntry('forseti_collection', './assets/js/collection.js')

    // readUrl js
    .addEntry('forseti_readUrl', './assets/js/readUrl.js')

// uncomment if you use API Platform Admin (composer req api-admin)
//.enableReactPreset()
//.addEntry('admin', './assets/js/admin.js')
;

module.exports = Encore.getWebpackConfig();
