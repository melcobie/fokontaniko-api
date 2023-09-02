# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Install Oracle Instant Client (download from Oracle website and place in the same directory as this Dockerfile)
COPY instantclient-basic-linux.x64-19.19.0.0.0dbru.el9.zip . 
RUN unzip instantclient-basic-linux.x64-19.19.0.0.0dbru.el9.zip && \
    rm instantclient-basic-linux.x64-19.19.0.0.0dbru.el9.zip && \
    mv instantclient_19_19 /opt/oracle

# Set environment variables for Oracle Client
ENV LD_LIBRARY_PATH=/opt/oracle
ENV OCI_LIB_DIR=/opt/oracle
ENV OCI_INC_DIR=/opt/oracle/sdk/include

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install application dependencies
RUN npm install -g ts-node
RUN npm install
RUN npm install typescript

# Copy the rest of your application code into the container
COPY . .

# Expose the port your application listens on
EXPOSE 8010

# Define the command to run your Node.js application
CMD ["ts-node", "src/index.ts"]
