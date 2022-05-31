FROM wordpress:php8.0-fpm-alpine

RUN set ex; \
	docker-php-ext-install -j "$(nproc)" \
		pdo_mysql \
	; \
