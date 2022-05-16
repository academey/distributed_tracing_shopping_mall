import {requestApi} from './request.js';

export class CheckoutAPIClass {
    getRequestURL(path) {
        return `${process.env.CHECKOUT_HOST}:${process.env.CHECKOUT_PORT}/${path}`;
    }

    checkout = async () => {
        let requestURL = this.getRequestURL("checkout");
        const axiosResponse = await requestApi(requestURL, {
            method: 'GET'
        });

        return axiosResponse.data;
    };

  addCheckoutListData = async ({productId}) => {
    let requestURL = this.getRequestURL(`cart_add/${productId}`);
    console.log('getRequestURL is ', requestURL);
    const axiosResponse = await requestApi(requestURL, {
      method: 'GET'
    });

    return axiosResponse.data;
  };

  removeCheckoutListData = async ({productId}) => {
    let requestURL = this.getRequestURL(`cart_remove/${productId}`);
    console.log('getRequestURL is ', requestURL);
    const axiosResponse = await requestApi(requestURL, {
      method: 'GET'
    });

    return axiosResponse.data;
  };

    loadCheckoutData = async ({productId}) => {
        const axiosResponse = await requestApi(this.getRequestURL(`product/${productId}`), {
            method: 'GET'
        });

        return axiosResponse.data;
    };
}

export const CheckoutAPI = new CheckoutAPIClass();
