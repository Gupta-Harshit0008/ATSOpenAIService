# Use an official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port (change if your app uses a different port)
EXPOSE 8000

# Start the app (change src/index.js if your entry point is different)
CMD ["npm", "start"]
