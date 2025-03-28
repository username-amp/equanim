FROM php:8.3-fpm

# Remove MongoDB completely
RUN apt-get update && apt-get remove -y php-mongodb \
    && rm -f /usr/local/etc/php/conf.d/docker-php-ext-mongodb.ini \
    && apt-get autoremove -y

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev \
    libicu-dev libzip-dev zip unzip nodejs npm \
    libfreetype6-dev libjpeg62-turbo-dev

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl opcache xml

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

# Debug environment variables
RUN mkdir -p storage/logs
RUN echo "RAILWAY_PRIVATE_DOMAIN: ${RAILWAY_PRIVATE_DOMAIN}" >> storage/logs/env.log
RUN echo "MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}" >> storage/logs/env.log

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts -vvv
COPY . .

RUN composer run-script post-autoload-dump
RUN npm install && npm run build

EXPOSE 80
CMD ["php-fpm"]