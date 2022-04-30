import dotenv from 'dotenv';
import {requestApi} from './request.js';


dotenv.config();

export class ProductAPIClass {
    getRequestURL(path) {
        if (process.env.NODE_ENV == 'development') {
            console.log("development 접근");
            return `${process.env.URL_process}/${path}`
        } else {
            return `http://search.192.168.64.3.sslip.io/${path}`
        }
    }

    loadListData = async () => { //product list 전체 호출
        let requestURL = this.getRequestURL(
            "product"
        );
        console.log('getRequestURL is ', requestURL);
        console.log(process.env.NODE_ENV);
        console.log(process.env.URL_search);

        try {
            const axiosResponse = await requestApi(
                requestURL, {
                    method: 'GET'
                });
            console.log('axiosResponse is ', axiosResponse);
            return axiosResponse.data;
        } catch (e) {
            console.log('error is ', e);
            return e;
        }
    };

    loadData = async ({  //id를 통해 정보 얻어오기(특정 product의 세부정보)
                          product_id
                      }) => {
        const axiosResponse = await requestApi(
            this.getRequestURL(
                `product/${product_id}`
            ), {
                method: 'GET'
            });

        return axiosResponse.data;
    };
}

export const ProductAPI = new ProductAPIClass();
