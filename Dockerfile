# Use an official PHP image with FPM
FROM php:8.1-fpm

# Install system dependencies and Node.js
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions needed by Laravel
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Set working directory
WORKDIR /var/www

# Copy Composer files and install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copy the rest of the application code
COPY . .

# Install Node dependencies and build front-end assets
RUN npm install
RUN npm run production

# Expose port 80 (Render will map $PORT to this)
EXPOSE 80

# Start PHP-FPM
CMD ["php-fpm"]
