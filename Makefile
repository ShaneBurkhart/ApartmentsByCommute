NAME=apartments_by_commute
IMAGE_TAG=shaneburkhart/${NAME}

all: run

build:
	docker build -t ${IMAGE_TAG} .

compile:
	docker run --rm --env-file user.env -v $(shell pwd):/app ${IMAGE_TAG} bundle exec ruby compile.rb

run:
	docker-compose -f docker-compose.dev.yml up -d

stop:
	docker-compose -f docker-compose.dev.yml down

logs:
	docker-compose -f docker-compose.dev.yml logs -f

ps:
	docker-compose -f docker-compose.dev.yml ps
