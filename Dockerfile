# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if present)
# This helps in caching npm install layers
COPY package*.json ./

# Install app dependencies (runs npm install)
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port the app will run on (e.g., 3000)
EXPOSE 3000

# Command to run the app when the container starts
CMD ["node", "app.js"]
