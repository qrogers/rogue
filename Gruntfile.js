module.exports = function(grunt) {
    grunt.initConfig({
      concat: {
        my_target: {
          files: {
            'run.js': ['src/*']
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-concat'); // load the given tasks
    grunt.registerTask('default', ['concat']); // Default grunt tasks maps to grunt
  };