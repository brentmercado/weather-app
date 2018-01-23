const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
   .options({
      a: {
         demand: true,
         alias: 'address',
         describe: 'Address to fetch weather for',
         string: true
      }
   })
   .help()
   .alias('help', 'h')
   .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
   if (errorMessage) {
      console.log(errorMessage);
   }
   else {
      console.log(results.address);
      weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
         if (errorMessage) {
            console.log(errorMessage);
         }
         else {
            console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
         }
      });
   }
});

// forecast api key: 93d01f75130bf4d6400bf8036d6074a1
