# Sinatra Base
[Sinatra](http://www.sinatrarb.com) + [shotgun](https://github.com/rtomayko/shotgun) + [foreman](http://ddollar.github.com/foreman/) + [Thin](http://code.macournoyer.com/thin/). It is [Heroku](http://www.heroku.com) ready!

Run using `foreman start -f Procfile.dev` and open [localhost:3000](http://localhost:3000) in your browser.

## Download
```
curl https://raw.github.com/gist/5137209 | bash -s project_name
cd project_name
;: Press y on your keyboard when prompted, this might up to 20 minutes if ruby needs to be compiled
```

The [gist](https://gist.github.com/leonelgalan/5137209) is a simple bash script that:
* Downloads the latest code form this repository
* Renames your project's folder
* Sets the latest ruby 1.9.3 patch and project's gemset

## Build your own
### Setup
```
rvm get stable ;: Update RVM

mkdir project_name

curl 'http://ftp.ruby-lang.org/pub/ruby/1.9/' 2> /dev/null | ruby -e 'puts STDIN.lines.map { |x| /1\.9\.3-p\d+\b/.match(x) }.compact.last[0]'

;: ruby-1.9.3-p392 is the latest at the time of this writing

tee -a project_name/.rvmrc <<EOF
rvm use --create --install 1.9.3-p392@project_name
EOF

cd project_name

;: Press y on your keyboard when prompted, this might take up to 20 minutes if ruby needs to be compiled from source
```

### Files
#### Gemfile
Use the full https address in source, the symbol for rubygems was deprecated in d30026e9c8fc6c98478120866a47ca5b619251b8
```
source 'https://rubygems.org'
```

[Use the pessimistic operator](http://robots.thoughtbot.com/post/2508037841/rubys-pessimistic-operator) whenever is possible.
```
gem 'sinatra', '~> 1.3.5'
```

#### views/layout.erb
By default, all views will be rendered inside this layout where `<%= yield %>` is.

#### views/index.erb
`erb :index` in _app.rb_ looks for this template in the _views_folder by default.

#### public/
All files inside _public_ will be served relative to to the root url (_/_), but '/' will not match '/index.html' and hence the
need to send it manually if needed.
```
def '/' do
  send_file File.join(settings.public_folder, 'index.html')
end
```
