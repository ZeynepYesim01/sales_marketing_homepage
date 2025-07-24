# Specify the base image: We are using the latest Alpine version of Nginx.
# The Alpine version is smaller and takes up less space.
FROM nginx:alpine

# Copy the web page files (HTML, CSS, JS, images, etc.).
# This command copies all files (and subdirectories) from the directory
# where the Dockerfile is located to Nginx's default web root directory: /usr/share/nginx/html
# If your web pages are in a subdirectory like 'public' or 'dist',
# you can specify a path like 'COPY ./public /usr/share/nginx/html'.
COPY . /usr/share/nginx/html
# Copy your custom Nginx configuration file to override the default.
COPY nginx.conf /etc/nginx/nginx.conf

# Specify the port the application will run on (Nginx defaults to port 80)
EXPOSE 80

# The Nginx image by default includes the command to start the Nginx server,
# so a CMD command is usually not necessary.
# However, if you want to explicitly state it:
# CMD ["nginx", "-g", "daemon off;"]
