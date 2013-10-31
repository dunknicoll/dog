module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './'
                }
            }
        },
        watch: {
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        }
    });
 
    grunt.registerTask('default', ['connect', 'open', 'watch']);
 
}
