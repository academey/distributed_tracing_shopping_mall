import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1
    },
  },
};

const SLEEP_DURATION = 0.1;

export default function () {
  const params = {
    tags: {
      name: 'get_all_product', // first request
    },
  };
  group('cite3 shopping mall scenario', (_) => {
    // const get_all_product_response = http.get('http://localhost:8007/product', params);  
    const get_all_product_response = http.get(__ENV.GET_ALL_RPODUCT_ENDPOINT, params);  
    check(get_all_product_response, {
      'is status 200': (r) => r.status === 200,
    });
    sleep(SLEEP_DURATION);

    
    params.tags.name = 'search_product';
    // const search_product_response = http.get('http://localhost:8001/search', params);  
    const search_product_response = http.get(__ENV.SEARCH_PRODUCT_ENDPOINT, params);  
    check(search_product_response, {
      'is status 200': (r) => r.status === 200,
    });
    sleep(SLEEP_DURATION);

    params.tags.name = 'get_one_product';
    // const get_one_product_response = http.get('http://localhost:8007/product/1', params);  
    const get_one_product_response = http.get(__ENV.GET_ONE_PRODUCT_ENDPOINT, params);  
    check(get_one_product_response, {
      'is status 200': (r) => r.status === 200,
    });
    sleep(SLEEP_DURATION);

    params.tags.name = 'see_ad';
    // const see_ad_response = http.get('http://localhost:8003/ad', params);  
    const see_ad_response = http.get(__ENV.SEE_AD_ENDPOINT, params);  
    check(see_ad_response, {
      'is status 200': (r) => r.status === 200,
    });
    sleep(SLEEP_DURATION);
    
    params.tags.name = 'add_product_to_cart';
    // const add_product_to_cart_response = http.get('http://localhost:8008/cart_add/1', params);  
    const add_product_to_cart_response = http.get(__ENV.ADD_PRODUCT_TO_CART_ENDPOINT, params);  
    check(add_product_to_cart_response, {
      'is status 200': (r) => r.status === 200,
    });
    sleep(SLEEP_DURATION);

    params.tags.name = 'checkout_cart';
    // const checkout_cart_response = http.get('http://localhost:8009/checkout', params);
    const checkout_cart_response = http.get(__ENV.CHECKOUT_CART_ENDPOINT, params);
    check(checkout_cart_response, {
      'is status 200': (r) => r.status === 200,
    });
    sleep(SLEEP_DURATION);
  });
}