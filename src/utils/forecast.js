const request = require('request')

const fahrenheitToCelsius = (fahrenheit) => Math.ceil((fahrenheit - 32) * (5/9))
const floatToPercent = (float) => float * 100

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/" + process.env.DARKSKY_TOKEN + "/" + latitude + "," + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) { 
            callback('Unable to find location', undefined)
        } else {
            const currentTempF = body.currently.temperature
            const currentTempC = fahrenheitToCelsius(currentTempF)
            const currentPercipProb = body.currently.precipProbability
            const currentPercipProbPercent = floatToPercent(currentPercipProb)
            const dailySummary = body.daily.data[0].summary
            const temperatureHighF = body.daily.data[0].temperatureHigh
            const temperatureLowF = body.daily.data[0].temperatureLow
            const temperatureHighC = fahrenheitToCelsius(temperatureHighF)
            const temperatureLowC = fahrenheitToCelsius(temperatureLowF)

            const data = {
                summary: `${dailySummary} With temperature: ${currentTempC}°C and percipitation chance: ${currentPercipProbPercent}%. The high today is ${temperatureHighC}°C with a low of ${temperatureLowC}°C.`,
            }

            callback(undefined, data)
        }
    })
}

module.exports = forecast