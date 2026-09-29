FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --production
COPY src ./src
EXPOSE 4001
CMD ["yarn", "start"]
