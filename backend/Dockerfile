# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the backend files
COPY . .

# Copy the .env file into the container (⚠️ Less secure!)
COPY .env /app/.env

# Expose the port your backend runs on (e.g., 5000)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
