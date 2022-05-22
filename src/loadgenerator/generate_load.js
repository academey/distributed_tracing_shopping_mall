const exec = require('await-exec')
 

var GET_ALL_RPODUCT_ENDPOINT = process.env.GET_ALL_RPODUCT_ENDPOINT
var SEARCH_PRODUCT_ENDPOINT = process.env.SEARCH_PRODUCT_ENDPOINT
var GET_ONE_PRODUCT_ENDPOINT = process.env.GET_ONE_PRODUCT_ENDPOINT
var SEE_AD_ENDPOINT = process.env.SEE_AD_ENDPOINT
var ADD_PRODUCT_TO_CART_ENDPOINT = process.env.ADD_PRODUCT_TO_CART_ENDPOINT
var CHECKOUT_CART_ENDPOINT = process.env.CHECKOUT_CART_ENDPOINT

async function logger (text) {
  const command = `k6 -e GET_ALL_RPODUCT_ENDPOINT=${GET_ALL_RPODUCT_ENDPOINT} -e SEARCH_PRODUCT_ENDPOINT=${SEARCH_PRODUCT_ENDPOINT} -e GET_ONE_PRODUCT_ENDPOINT=${GET_ONE_PRODUCT_ENDPOINT} -e SEE_AD_ENDPOINT=${SEE_AD_ENDPOINT} -e ADD_PRODUCT_TO_CART_ENDPOINT=${ADD_PRODUCT_TO_CART_ENDPOINT} -e CHECKOUT_CART_ENDPOINT=${CHECKOUT_CART_ENDPOINT} --address "localhost:8011" run script.js`;
  console.log('command is ', command);
  const result = await exec(command)
  console.log(result.stdout)
}
 
Promise.resolve().then(function resolver() {
    return logger()
    .then(() => {console.log("called")})
    .then(resolver);
}).catch((error) => {
    console.log("Error: " + error);
});