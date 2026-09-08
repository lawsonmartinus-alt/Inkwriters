FROM node:22-slim AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install -g npm@latest
RUN npm ci --include=dev
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "start"]

