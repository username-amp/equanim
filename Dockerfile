FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    libfreetype6-dev \
    libjpeg62-turbo-dev

RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl opcache xml

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

COPY composer.json composer.lock ./

# Debugging steps
RUN php -v
RUN php -m
RUN composer --version

RUN composer install --no-dev --optimize-autoloader -vvv

COPY . .

RUN npm install
RUN npm run production

EXPOSE 80

CMD ["php-fpm"]