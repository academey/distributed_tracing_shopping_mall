import {requestApi} from './request.js';

export class CartAPIClass {
    getRequestURL(path) {
        return `${process.env.CART_HOST}:${process.env.CART_PORT}/${path}`;
    }

    loadCartListData = async () => {
        let requestURL = this.getRequestURL("cart");
        console.log('getRequestURL is ', requestURL);
        const axiosResponse = await requestApi(requestURL, {
            method: 'GET'
        });

        return axiosResponse.data;
    };

  addCartListData = async ({productId}) => {
    let requestURL = this.getRequestURL(`cart_add/${productId}`);
    console.log('getRequestURL is ', requestURL);
    const axiosResponse = await requestApi(requestURL, {
      method: 'GET'
    });

    return axiosResponse.data;
  };

  removeCartListData = async ({productId}) => {
    let requestURL = this.getRequestURL(`cart_remove/${productId}`);
    console.log('getRequestURL is ', requestURL);
    const axiosResponse = await requestApi(requestURL, {
      method: 'GET'
    });

    return axiosResponse.data;
  };

    loadCartData = async ({productId}) => {
        const axiosResponse = await requestApi(this.getRequestURL(`product/${productId}`), {
            method: 'GET'
        });

        return axiosResponse.data;
    };
}

export const CartAPI = new CartAPIClass();
