# Use the official Node.js 14 image as the base image
FROM node:14 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the entire frontend application to the container
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use a smaller, lightweight web server to serve the production build
FROM nginx:alpine

# Copy the built Angular app from the builder stage to the web server directory
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Expose the default port for the NGINX web server
EXPOSE 80

# Start the NGINX web server when the container is run
CMD ["nginx", "-g", "daemon off;"]
