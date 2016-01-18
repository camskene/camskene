/* global module */

/*
 $ npm install grunt-contrib-uglify grunt-autoprefixer grunt-contrib-sass grunt-contrib-watch grunt-contrib-concat grunt-contrib-jshint grunt-contrib-clean grunt-notify grunt-contrib-connect grunt-contrib-copy grunt-contrib-cssmin grunt-browserify grunt-filerev grunt-userev2 --save-dev
*/

module.exports = function(grunt) {

  grunt.initConfig({

    // Server
    connect: {
      server: {
        options: {
          port: 1337,
          base: './dist',
          keepalive: true,
          livereload: true
        }
      }
    },

    // copy html
    copy: {
      html: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.html'],
          dest: 'dist/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['images/**/*'],
          dest: 'dist/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['fonts/**/*'],
          dest: 'dist/'
        }]
      }
    },

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
        src: ['src/scripts/plugins.js','src/scripts/main.js'],
        dest: 'dist/scripts/main.js'
      }
    },

    // Uglify
    uglify: {
      js: {
        src: 'dist/scripts/main.js',
        dest: 'dist/scripts/main.min.js'
      }
    },


    // Clean
    clean: {
      build: ['dist/styles', 'dist/scripts', 'dist/images']
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
        tasks: ['sass', 'autoprefixer'],
      },
      scripts: {
        files: 'src/scripts/**/*.js',
        tasks: ['concat'],
      },
      images: {
        files: 'src/images/**/*',
        tasks: ['copy:images'],
      },
      html: {
        files: 'src/*.html',
        tasks: ['copy:html'],
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'dist/*.html',
          'dist/styles/**/*.css',
          'dist/scripts/**/*.js',
          'dist/images/**/*'
        ]
      }
    },

    // File rev files
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      sourcemaps: { // Rename sourcemaps.
        src: ['dist/styles/*.map.css', 'dist/scripts/*.map.js'],
      },
      assets: { // Rename minified js/css.
        src: ['dist/styles/*.css', 'dist/scripts/*.js', '!dist/styles/*.map.css', '!dist/scripts/*.map.js'],
      },
    },

    userev: {
      options: {
        hash: /(\.[a-f0-9]{8})\.[a-z]+$/,
      },
      assets: { // Link to sourcemaps in minified js/css.
        src: ['dist/styles/*.css', 'dist/js/*.js', '!dist/styles/*.map.css', '!dist/scripts/*.map.js'],
        options: {
          patterns: {
            'Linking versioned source maps': /sourceMappingURL=([a-z0-9.]*\.map)/,
          },
        },
      },
      index: { // Link to minified js/css in index html.
        src: 'dist/index.html',
        options: {
          patterns: {
            'Linking versioned css assets': /(styles\/[a-z0-9./]*\.css)/g,
            'Linking versioned js assets': /(scripts\/[a-z0-9./]*\.js)/g,
          },
        },
      },
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
    'cssmin',
    'copy',
    'connect'
  ]);

  // Build task
  grunt.registerTask('build', [
    'jshint',
    'clean',
    'concat',
    'uglify',
    'sass',
    'autoprefixer',
    'cssmin',
    'copy',
    'rev'
  ]);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-userev2');

  grunt.registerTask('rev', [
    'filerev:sourcemaps', // Rename sourcemaps.
    'userev:assets', // Link to sourcemaps in minified js/css.
    'filerev:assets', // Rename minified js/css.
    'userev:index', // Link to minified js/css in index html.
  ]);

};
