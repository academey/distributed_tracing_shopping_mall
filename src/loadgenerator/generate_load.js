const exec = require('await-exec')
 

var API_ENDPOINT = (process.env.API_ENDPOINT || 'https://test.k6.io');

async function logger (text) {
  const result = await exec(`k6 -e API_ENDPOINT=${API_ENDPOINT} run script.js`)
  console.log(result.stdout)
}
 
Promise.resolve().then(function resolver() {
    return logger()
    .then(() => {console.log("its called")})
    .then(resolver);
}).catch((error) => {
    console.log("Error: " + error);
});