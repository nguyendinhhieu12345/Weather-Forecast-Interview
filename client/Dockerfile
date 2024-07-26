# syntax=docker/dockerfile:1.4

# Use the official Node.js image from DockerHub
FROM node:lts-buster AS development

# Install xdg-utils
RUN apt-get update && apt-get install -y xdg-utils

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all files to the app directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variable to handle warnings
ENV NODE_OPTIONS="--no-deprecation"

# Run the application
CMD ["npm", "run", "dev"]
