FROM ruby
MAINTAINER Shane Burkhart <shaneburkhart@gmail.com>

VOLUME ["/app"]
WORKDIR /app

ADD Gemfile /app/Gemfile
RUN bundle install

ADD . /app/

CMD bundle exec ruby server.rb
