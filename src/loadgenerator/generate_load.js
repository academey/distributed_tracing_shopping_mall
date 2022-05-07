const exec = require('await-exec')
 
async function logger (text) {
  const result = await exec(`k6 run script.js`)
  console.log(result.stdout)
}
 
Promise.resolve().then(function resolver() {
    return logger()
    .then(() => {console.log("its called")})
    .then(resolver);
}).catch((error) => {
    console.log("Error: " + error);
});