FROM nginx:1.17

COPY build/ /usr/share/nginx/html

# Remove the default config 
RUN rm /etc/nginx/conf.d/default.conf

# Use custom config to support client side routing
COPY nginx.conf  /etc/nginx/conf.d/default.conf
