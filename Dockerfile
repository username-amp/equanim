# Use PHP 8.2 FPM image to satisfy PHP ^8.2 requirement
FROM php:8.2-fpm

# Install system dependencies, including libraries for intl and zip extensions, and Node.js
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
    npm

# Install required PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Configure and install intl extension
RUN docker-php-ext-configure intl
RUN docker-php-ext-install intl

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www

# Copy Composer files and install PHP dependencies with verbose output for troubleshooting
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader -vvv

# Optionally, verify that intl and zip extensions are enabled
RUN php -m | grep -E 'intl|zip'

# Copy the rest of your application code
COPY . .

# Install Node dependencies and build front-end assets
RUN npm install
RUN npm run production

# Expose port 80 (Railway will map its $PORT to this)
EXPOSE 80

# Start PHP-FPM
CMD ["php-fpm"]
