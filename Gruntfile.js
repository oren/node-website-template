module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      compile: {
        files: {
          'public/css/app.css': 'public/css/*.styl' // compile and concat into single file
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('default', 'stylus');
};
