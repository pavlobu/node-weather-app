const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT

//link public folder to serve to public
const publicDireectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// init handlebars to express (which is hbs plugin) 
// and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDireectoryPath))

app.get('', (req, res) => {
    res.render('index', { // match name for .hbs -> loads hbs
        title: 'Weather App',
        name: 'Paul'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', { // match name for .hbs -> loads hbs
        title: 'About',
        name: 'Paul'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', { // match name for .hbs -> loads hbs
        title: 'Help',
        name: 'Paul',
        helpfultext: 'This is some helpful text'
    }) 
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        })
    }

    try {
        geocode(
            req.query.address,
            (error, {
                latitude,
                longitude,
                location
            } = {}) => {
                if (error) {
                    return res.send({error})
                }

                forecast(
                    latitude,
                    longitude,
                    (error, forecastData) => {
                        if (error) {
                            return res.send({error})
                        }

                        res.send({
                            location,
                            forecast: forecastData,
                            address: req.query.address
                        })
                    }
                )
            }
        )
    } catch (e) {
        res.send({
            error: `Weather data couldn't be retrieved: ${e} `
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: '404 Help page not found'
    })
})

// set up 404 page get last!!
// * match anything that hasnt been matched
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 page not found'
    })
})


// start server with app.listen(portNumber)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})