FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server/location-server.js ./server/location-server.js
ENV NODE_ENV=production
ENV LOCATION_WS_PORT=8080
EXPOSE 8080
CMD ["node", "server/location-server.js"]
