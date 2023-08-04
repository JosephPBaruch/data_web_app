FROM node:20.5.0

# Create app directory
WORKDIR /app

# Copy over the package.json file
COPY package.json /app

# Install dependencies listed in package.json
RUN npm install 

# Copy the remaining files
COPY . ./

# Port that is exposed (not displayed necessarily)
# This is for show (doesnt actually expose the port)
EXPOSE 3000

CMD ["npm", "run", "start"]
