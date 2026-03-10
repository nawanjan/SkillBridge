# Use official Node.js lightweight image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all remaining project files
COPY . .

# Expose the port your Node app runs on
EXPOSE 3000

# Create non-root user (security best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Health check to ensure container is running
HEALTHCHECK --interval=30s --timeout=3s \
CMD wget --spider http://localhost:3000 || exit 1

# Run the application
CMD ["node", "index.js"]