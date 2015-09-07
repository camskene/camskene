/* global module */
module.exports = function(grunt) {
  grunt.initConfig({

    // Sass
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/styles/main.css': 'src/styles/main.scss'
        }
      }
    },

    // Autoprefix
    autoprefixer: {
      options: {
        browsers: [
          'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
        ]
      },
      dist: {
        src: 'dist/styles/main.css'
      }
    },

    // CSS minify
    cssmin: {
      dist: {
        files: {
          'dist/styles/main.min.css': 'dist/styles/main.css'
        }
      }
    },

    // JShint
    jshint: {
      files: ['src/scripts/main.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Concat
    concat: {
      js: {
        src: ['src/scripts/plugins.js', 'src/scripts/main.js'],
        dest: 'dist/scripts/main.js'
      }
    },

    // Uglify
    uglify: {
      dist: {
        src: 'dist/scripts/main.js',
        dest: 'dist/scripts/main.min.js'
      }
    },


    // Clean
    clean: {
      build: ['dist/styles', 'dist/scripts']
    },

    // Notify
    notify: {
      styles: {
        options: {
          message: 'Styles task complete',
        }
      },
      scripts: {
        options: {
          message: 'Scripts task complete',
        }
      }
    },

    // Watch
    watch: {
      styles: {
        files: 'src/styles/**/*.scss',
        tasks: ['sass', 'autoprefixer', 'cssmin', 'notify:styles'],
      },
      scripts: {
        files: 'src/scripts/**/*.js',
        tasks: ['concat', 'uglify', 'notify:scripts'],
      },
      livereload: {
        options: { livereload: true },
        files: [
          './*.html',
          'dist/styles/**/*.css',
          'dist/scripts/**/*.js',
          'dist/images/**/*'
        ]
      }
    }
  });

  // Default task
  grunt.registerTask('default', [
    'jshint',
    'clean',
    'concat',
    'uglify',
    'sass',
    'autoprefixer',
    'cssmin'
  ]);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-notify');

};
