# Use the Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first (to cache dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application ports
EXPOSE 3333 5555

# Run Prisma migrations and start the application
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./api/src/prisma/schema.prisma && npm run dev"]
