# Stage 1: Build the React application
FROM node:16

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Expose port 80 to the outer world
EXPOSE 80

CMD ["npm", "run", "start"]