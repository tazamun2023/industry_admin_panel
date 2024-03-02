# Image
FROM node:16.14.2

# Set up work directory
WORKDIR /var/www/front.industry.com.sa/

# Configure host
ENV HOST 0.0.0.0

# Init command
CMD ["sh", "-c", "npm install && npm build && npm start"]
# CMD ["sh", "-c", "yarn install && yarn dev"]
