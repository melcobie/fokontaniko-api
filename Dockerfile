# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Install Oracle Instant Client (download from Oracle website and place in the same directory as this Dockerfile)
COPY instantclient-basiclite-linux.x64-19.11.0.0.0dbru.zip . 
RUN unzip instantclient-basiclite-linux.x64-19.11.0.0.0dbru.zip && \
    rm instantclient-basiclite-linux.x64-19.11.0.0.0dbru.zip && \
    mv instantclient_19_11 /opt/oracle

# Set environment variables for Oracle Client
ENV LD_LIBRARY_PATH=/opt/oracle
ENV OCI_LIB_DIR=/opt/oracle
ENV OCI_INC_DIR=/opt/oracle/sdk/include

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port your application listens on
EXPOSE 8010

# Define the command to run your Node.js application
CMD ["ts-node", "src/index.ts"]
