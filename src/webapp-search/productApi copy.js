import {requestApi} from './request.js';


export class ProductAPIClass {
    getRequestURL(path) {
        return `http://${process.env.PRODUCT_HOST}:${process.env.PRODUCT_PORT}/${path}`;
    }

    loadListData = async () => { //product list 전체 호출
        let requestURL = this.getRequestURL(
            "product"
        );
        console.log('getRequestURL is ', requestURL);
        console.log(process.env);
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
