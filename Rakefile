@@current_release = '0.1'
@@version = '0.1'

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

namespace :mimic do
  namespace :ajax do
    desc 'Distribute mimic-ajax'
    task :dist do
      puts "Building Mimic Ajax version #{@@version}"

      print 'Prepare target...'
      `mkdir target`
      `rm target/*.js`
      `cp -R src/scripts/ajax/* target`
      puts 'done!'

      print 'Creating minified files...'
      js_src_files = Dir.glob('target/**/*.js')
      js_src_files.each do | js_src_file |
        js_target_file = js_src_file.sub('.js', '-min.js')

        print '.'
        `java -jar lib/yuicompressor-2.4.2.jar --nomunge --type js --preserve-semi --line-break 0 --charset ISO-8859-1 #{js_src_file} -o #{js_target_file}`
      end
      puts 'done!'

      print 'Creating new target file...'
      ordered_files = Dir.glob('target/*-min.js')
      `cat #{ordered_files.join(' ')} > target/mimic-ajax-#{@@version}.js`
      puts 'done!'

      print 'Cleaning up minified files...'
      `rm #{js_src_files.concat(Dir.glob('target/**/*-min.js')).join(' ')}`
      puts 'done!'

      if @@current_release.eql?(@@version)
        print 'Copying target file to examples directory...'
        `cp target/mimic-ajax-#{@@version}.js examples`
        puts 'done!'

        print 'Copying target file to release directory...'
        `cp target/mimic-ajax-#{@@version}.js release`
        puts 'done!'
      end
    end
  end
end