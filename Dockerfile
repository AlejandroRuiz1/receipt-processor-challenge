# Build using LTS node 18 image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copies package and package-lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Map port 
EXPOSE 8000

# Runtime command
CMD [ "npm", "start" ]