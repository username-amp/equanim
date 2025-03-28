# Use PHP 8.3 FPM image to meet dependency requirements
FROM php:8.3-fpm

# Install system dependencies, Node.js, and libraries for required PHP extensions
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

# Copy Composer files and install PHP dependencies with verbose output
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader -vvv

# Optionally, verify that the intl and zip extensions are enabled
RUN php -m | grep -E 'intl|zip'

# Copy the rest of the application code
COPY . .

# Install Node dependencies and build front-end assets
RUN npm install
RUN npm run production

# Expose port 80 (Railway will map $PORT to this)
EXPOSE 80

# Start PHP-FPM
CMD ["php-fpm"]
