module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      compile: {
        files: {
          'public/css/app.css': 'public/css/*.styl' // compile and concat into single file
        }
      }
    },
    browserify: {
      'public/js/app.min.js': ['public/js/app.js'],
      options: {
        debug: false
      }
    },
    watch: {
      stylus: {
        files: ['public/css/*.styl'],
        tasks: 'stylus'
      },
      browserify: {
        files: ['public/js/app.js'],
        tasks: 'browserify'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'stylus');
};
