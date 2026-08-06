FROM node:20-slim

WORKDIR /app

COPY server/package*.json ./
RUN npm install --omit=dev

COPY server/ .

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
