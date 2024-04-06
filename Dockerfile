# This dockerfile is not needed if deploying to azure static web app service as it will build the app automatically and serve it
FROM node:20-slim

# Your existing setup...
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . ./
RUN npm run build

# Install `serve` to serve your static files
RUN npm install -g serve

# Expose your chosen port of the container
EXPOSE 8080

# Serve your dist folder on the chosen port
CMD ["serve", "-s", "dist", "-l", "8080"]

# NGINX is not needed if deploying to azure app service
