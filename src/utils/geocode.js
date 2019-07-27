const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
                address + '.json?access_token=' + process.env.MAPBOX_TOKEN + '&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body['message']) {
            if (body['message'].toLowerCase().includes('not authorized')) {
                callback('Server was not able to communicate to third party apis to process your request', undefined)
            }
        } else if ( body.features.length === 0) {
            callback('No appropriate location found for query', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode