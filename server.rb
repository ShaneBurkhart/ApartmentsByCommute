require 'sinatra'
require 'haml'
require './models'

# docker needs stdout to sync to get logs.
$stdout.sync = true

set :bind, '0.0.0.0'

get '/' do
  haml :index
end

