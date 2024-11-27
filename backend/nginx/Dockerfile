FROM nginx:1.25
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
CMD ["sh", "-c", "sed -i 's|${PORT}|'${PORT}'|g; s|${NGINX_PORT}|'${NGINX_PORT}'|g; s|${NGINX_DOMAIN}|'${NGINX_DOMAIN}'|g' /etc/nginx/conf.d/nginx.conf && cat /etc/nginx/conf.d/nginx.conf && exec nginx -g 'daemon off;'"]