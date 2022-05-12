import {requestApi} from './request.js';

export class ProductAPIClass {
    getRequestURL(path) {
        return `${process.env.PRODUCT_HOST}:${process.env.PRODUCT_PORT}/${path}`;
    }

    loadProductListData = async () => {
        let requestURL = this.getRequestURL("product");
        console.log('getRequestURL is ', requestURL);
        const axiosResponse = await requestApi(requestURL, {
            method: 'GET'
        });

        return axiosResponse.data;
    };

    loadProductData = async ({productId}) => {
        const axiosResponse = await requestApi(this.getRequestURL(`product/${productId}`), {
            method: 'GET'
        });

        return axiosResponse.data;
    };
}

export const ProductAPI = new ProductAPIClass();
