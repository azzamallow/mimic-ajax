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
      puts "Distribute mimic-ajax version #{@@version}"

      print 'Prepare target...'
      `mkdir target`
      `rm target/*.js`
      `cp -R src/* target`
      puts 'done!'

      print 'Minifying source files...'
      js_src_files = Dir.glob('target/**/*.js')
      js_src_files.each do | js_src_file |
        js_target_file = js_src_file.sub('.js', '-min.js')

        print '.'
        `java -jar lib/yuicompressor-2.4.6.jar --type js --preserve-semi --charset ISO-8859-1 #{js_src_file} -o #{js_target_file}`
      end
      puts 'done!'
      
      print 'Creating new target file...'
      ordered_files = Dir.glob('src/mimic.ajax.overrides.js') + Dir.glob('src/mimic.ajax.js')
      `cat #{ordered_files.join(' ')} > target/mimic.ajax.#{@@version}.js`
      puts 'done!'

      print 'Creating new target minified file...'
      ordered_files = Dir.glob('target/mimic.ajax.overrides-min.js') + Dir.glob('target/mimic.ajax-min.js')
      `cat #{ordered_files.join(' ')} > target/mimic.ajax.#{@@version}-min.js`
      puts 'done!'

      if @@current_release.eql?(@@version)
        print 'Copying target files to release directory...'
        `cp target/mimic.ajax.#{@@version}.js target/mimic.ajax.#{@@version}-min.js release`
        puts 'done!'
      end
    end
  end
end