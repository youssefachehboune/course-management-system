# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .


# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]