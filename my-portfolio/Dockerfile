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

RUN yarn build
RUN ls -A | grep -v build | tr "\n" "\0" | xargs -0 rm -fr 
RUN mv build/* .

USER node
EXPOSE 80
ENTRYPOINT ["npx", "serve", "-s", ".", "-l", "80"]
