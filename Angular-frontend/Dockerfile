# Use Node.js image as base
FROM node:alpine as builder

# Set working directory
WORKDIR /app

# Run command in Virtual directory
RUN npm cache clean --force

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the application code
COPY . .

# Expose port for Angular app
EXPOSE 4200

# Command to start serving Angular app
CMD ["ng", "serve", "--host", "0.0.0.0"]
