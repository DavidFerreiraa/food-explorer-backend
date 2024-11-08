FROM node:latest

# Install PostgreSQL
RUN apt-get update && apt-get install -y postgresql postgresql-contrib
