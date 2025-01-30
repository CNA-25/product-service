# Use an official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including Prisma)
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Run database migrations (optional but recommended)
RUN npx prisma migrate deploy

# Set environment variables (PORT is required for Rahti)
ENV PORT=8080

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "server.js"]
