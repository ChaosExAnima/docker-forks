FROM --platform=linux/amd64 wordpress:php8.0-fpm-alpine

# RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar; \
# 	chmod +x wp-cli.phar; \
# 	mv wp-cli.phar /usr/local/bin/wp

RUN set -ex; \
	apk update; \
	apk add libxml2-dev;

RUN set -ex; \
	docker-php-ext-install -j "$(nproc)" \
	pdo_mysql \
	soap \
	; \