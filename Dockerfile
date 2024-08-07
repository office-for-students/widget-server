FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install

# installs nvm (Node Version Manager)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && RUN nvm install 20
# download and install Node.js (you may need to restart the terminal)

#RUN npm ci --only=production

COPY . .

EXPOSE 80

CMD [ "node", "server.js" ]