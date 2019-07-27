# Description

A weather forecast app written in JavaScript using
NodeJS, express.js
### third party apis: 
[https://darksky.net](Darksky.net) -- for address geocode finding by word
[https://www.mapbox.com/](Mapbox.com) -- for getting weather data for query location


# Prerequisites

* `nodejs` installed
* `npm` installed

# Setup

```bash
cd node-weather-app
npm install
```

# Configure:
Put your tokens for mapbox api and darksky api in
`config/dev.env`
### Example:
```
MAPBOX_TOKEN=l12k3j4ljLKJDh2l3kh4j
DARKSKY_TOKEN=KJDHSFLKJlkj3hkj3hlkJLD
```

### don't have tokens?
Get them for free with non payed subscription form these services accordingly:
[https://darksky.net](Darksky.net)
[https://www.mapbox.com/](Mapbox.com)

# Run production mode on local machine

```bash
export PORT=3000 # if run on your local. on heroku this var is set already for you
export MAPBOX_TOKEN=put-your-token-here
export DARKSKY_TOKEN=put-your-token-here
npm run
```

# Run production mode on heroku
When pushed your app to heroku repository,
you need to set environment varibales using
`heroku config`
[https://devcenter.heroku.com/articles/config-vars](More info here)
### Example:
```bash
heroku config:set MAPBOX_TOKEN=l12k3j4ljLKJDh2l3kh4j 
DARKSKY_TOKEN=KJDHSFLKJlkj3hkj3hlkJLD
```

# Run develop mode
* Change port number on which you want server to run in `config/dev.env`
* Also set your tokens for MAPBOX_TOKEN and DARKSKY_TOKEN in `config/dev.env`

```bash
npm run dev
```