# Use Node.js image as base
FROM node:latest as builder

# Set working directory inside container
WORKDIR /app

# Run command in Virtual directory
RUN npm cache clean --force

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN npm run build

# Stage 2: Production environment
FROM node:alpine

# Set working directory inside container
WORKDIR /app

# Copy built application from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production

# Start the server
CMD [ "node", "dist/main" ]
