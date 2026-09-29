FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --production
COPY src ./src
EXPOSE 4000
CMD ["yarn", "start"]
