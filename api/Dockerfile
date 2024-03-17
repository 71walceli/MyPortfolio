FROM node:18

# Create app directory
WORKDIR /App

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install --production

# Bundle app source
COPY ./ ./

USER node
EXPOSE 80
ENTRYPOINT [ "yarn", "start" ]
