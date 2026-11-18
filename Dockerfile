FROM nginx:1.27-alpine

# Remove config default do nginx e copia a nossa
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o site
COPY index.html /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY pix.js /usr/share/nginx/html/
COPY coffee.js /usr/share/nginx/html/
COPY bmc.js /usr/share/nginx/html/
COPY animate.js /usr/share/nginx/html/
COPY img /usr/share/nginx/html/img
COPY pt /usr/share/nginx/html/pt
COPY en /usr/share/nginx/html/en
COPY es /usr/share/nginx/html/es

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
