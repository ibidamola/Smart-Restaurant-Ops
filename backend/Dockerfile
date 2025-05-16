# Use official Node.js LTS version as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the backend source code
COPY . .

# Expose the port your app will run on (make sure to set GRAPHQL_PORT in your env or default)
ENV GRAPHQL_PORT=6002
ENV NODE_ENV=development

EXPOSE 6002

# Start the app
CMD ["npm", "run", "dev"]
