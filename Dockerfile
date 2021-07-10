FROM node:14-alpine As deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./

RUN npm install --only=development

FROM node:14-alpine As buider

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build && npm install

FROM node:14-alpine as production

ENV NODE_ENV production

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --chown=node:node . .
COPY --from=buider --chown=node:node /app/dist ./dist
USER node
CMD ["node", "dist/main.js"]

EXPOSE 3000