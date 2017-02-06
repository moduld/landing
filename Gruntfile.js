module.exports = function (grunt)
{
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var path = '.';

    grunt.initConfig({

        sass: {
            options: {
                sourceMap  : true,
                outputStyle: 'expanded',
                indentWidth: 4
            },
            dev: {
                files  : [{
                    expand: true,
                    cwd   : path + '/src/sass',
                    src   : ['**/*.scss'],
                    dest  : path + '/assets/css',
                    ext   : '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', '> 1%'],
                map     : {
                    inline        : false,
                    sourcesContent: false,
                    prev          : false
                }
            },
            files  : {
                expand : true,
                cwd   : path + '/assets/css',
                src   : ['**/*.css', '!**/*.min.css'],
                dest  : path + '/assets/css',
            }
        },

        clean: {
            options: {
                'force': true
            },
            css    : [path + '/assets/css/*'],
            js     : [path + '/assets/js/*'],
            img    : [path + '/assets/img/*']
        },

        uglify: {
            options: {
                quoteStyle: 3
            },
            js     : {
                files: [{
                    expand: true,
                    cwd   : path + '/assets/js',
                    src   : '**/*.js',
                    dest  : path + '/assets/js',
                    ext   : '.min.js'
                }]
            }
        },

        copy: {
            js     : {
                files: [{
                    expand: true,
                    cwd   : path + '/assets/js',
                    src   : '**/*.js',
                    dest  : path + '/assets/js',
                    ext   : '.min.js'
                }]
            },
            css     : {
                files: [{
                    expand: true,
                    cwd   : path + '/assets/css',
                    src   : '**/*.css',
                    dest  : path + '/assets/css',
                    ext   : '.min.css'
                }]
            },
            img: {
                files: [{
                    expand: true,
                    cwd   : path + '/src/img',
                    src   : '**/*',
                    dest  : path + '/assets/img'
                }]
            }
        },

        tinyimg: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd   : path + '/src/img',
                    src   : '**/*.{png,jpg,jpeg,svg}',
                    dest  : path + '/assets/img'
                }]
            }
        },

        image: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd   : path + '/src/img',
                    src   : '**/*.{png,jpg,jpeg,svg,gif}',
                    dest  : path + '/assets/img'
                }]
            }
        },

        watch: {
            js: {
                files: [path + '/src/js/**/*.js'],
                tasks: ['js:dev']
            },
            css: {
                files: [path + '/src/sass/**/*.scss'],
                tasks: ['css:dev']
            },
            img: {
                files: [path + '/src/img/**/*'],
                tasks: ['img:dev']
            }
        },

        mkdir: {
            folders: {
                options: {
                    mode: 0775,
                    create: [
                        path + '/assets/css', path + '/assets/img', path + '/assets/js', path + '/assets/icons',
                        path + '/src/sass', path + '/src/img', path + '/src/js'
                    ]
                }
            }
        },

        cmq: {
            css: {
                files: [{
                    expand: true,
                    cwd   : path + '/assets/css',
                    src   : ['**/*.css', '!**/*.min.css'],
                    dest  : path + '/assets/css'
                }]
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                semanticMerging: true
            },
            target: {
                files: [{
                    expand: true,
                    cwd   : path + '/assets/css',
                    src   : ['**/*.css', '!**/*.min.css'],
                    dest  : path + '/assets/css',
                    ext   : '.min.css'
                }]
            }
        },

        babel: {
            options: {
                presets: ['es2015-script'],
                plugins: ['transform-strict-mode']
            },
            files: {
                expand: true,
                cwd   : path + '/src/js',
                src   : '**/*.js',
                dest  : path + '/assets/js'
            }
        }

    });


    grunt.registerTask('js:prod', ['clean:js', 'babel', 'uglify']);
    grunt.registerTask('js:dev', ['babel', 'copy:js']);

    grunt.registerTask('css:dev', ['sass', 'cmq', 'autoprefixer', 'copy:css']);
    grunt.registerTask('css:prod', 'Compile css', function()
    {
        //grunt.config.set('autoprefixer.options.map', false);
        //grunt.config.set('sass.options.sourceMap', false);
        grunt.task.run(['clean:css', 'sass', 'cmq', 'autoprefixer', 'cssmin']);
    });

    grunt.registerTask('img:dev', ['copy:img']);
    grunt.registerTask('img:prod', function()
    {
        grunt.task.run('clean:img');
        grunt.file.expand('src/img/*.{jpg,jpeg,png,svg}').length && grunt.task.run('tinyimg');
    });

    grunt.registerTask('development', ['img:dev', 'css:dev', 'js:dev']);
    grunt.registerTask('production', ['img:prod', 'css:prod', 'js:prod']);
    grunt.registerTask('create', ['mkdir']);
    grunt.registerTask('default', ['watch']);
    
};