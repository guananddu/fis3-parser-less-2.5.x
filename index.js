const less = require( 'less' );
const root = fis.project.getProjectPath();

module.exports = function( content, file, settings ) {

    settings.paths = [ file.dirname, root ];

    settings.syncImport = true;
    settings.relativeUrls = true;

    less.render( content, settings, function( err, result ) {
        if ( err ) {
            throw err;
            return;
        }
        content = result.css;
        result.imports.forEach( function( path ) {
            file.cache.addDeps( path );
        } );
    } );

    return content;
};