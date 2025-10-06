# Use a lightweight Node.js runtime as base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev || npm install --omit=dev

# Copy the rest of the app
COPY . .

# Optional build step (only runs if your app has a build script)
RUN npm run build || echo "no build script"

# Cloud Run requires the app to listen on $PORT
ENV PORT=8080
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
