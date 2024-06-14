FROM cypress/factory

ARG NODE_VERSION='20.9.0'

WORKDIR /app

RUN apt update && apt install -y chromium

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx cypress install

VOLUME ["/app/cypress/videos/"]

ENTRYPOINT ["npm","run","cypress:runner"]