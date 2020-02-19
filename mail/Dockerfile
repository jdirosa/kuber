FROM node:8

WORKDIR /opt/gql

# install deps
COPY package.json /opt/gql
RUN npm install

# Setup workdir
COPY . /opt/gql

# run
EXPOSE 4000
CMD ["npm", "start"]