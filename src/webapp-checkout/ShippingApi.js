import dotenv from 'dotenv';
import {requestApi} from './request.js';


dotenv.config();


export class ShippingAPIClass {
    getRequestURL(path) {
        return `http://${process.env.SHIPPING_HOST}:${process.env.SHIPPING_PORT}/${path}`;
    }

    loadshippingInfo = async () => {
        let requestURL = this.getRequestURL(
            "shipping_info"
        );
        console.log('getRequestURL is ', requestURL);

        try {
            const axiosResponse = await requestApi(
                requestURL, {
                    method: 'GET'
                });
            //console.log('axiosResponse is ', axiosResponse);
            return axiosResponse.data;
        } catch (e) {
            console.log('error is ', e);
            return e;
        }
    };

    loadshippingList = async () => { //구매내역 전체 호출(현재 구매내역에 있는것들)
        let requestURL = this.getRequestURL(
            "shipping"
        );
        console.log('getRequestURL is ', requestURL);

        try {
            const axiosResponse = await requestApi(
                requestURL, {
                    method: 'GET'
                });
            //console.log('axiosResponse is ', axiosResponse);
            return axiosResponse.data;
        } catch (e) {
            console.log('error is ', e);
            return e;
        }
    };

    addShippingAll = async() =>{    //카트의 모든 물품을 구매내역에 담음
        const axiosResponse = await requestApi(
            this.getRequestURL(
                `shipping_add`
            ), {
                method: 'GET'
            });


        return axiosResponse.data;
    }

    addShipping = async (  //shipping_add/:add_id 실행 
                          product_id
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `shipping_add/${product_id}`
            ), {
                method: 'GET'
            });


        return axiosResponse.data;
    };

    removeShipping = async (  //id에 해당하는 물품이 cart_list에 있다면, 제거)
                          product_id
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `shipping_remove/${product_id}`
            ), {
                method: 'GET'
            });
            //console.log(`데이터 확인: ${product_id},  ${axiosResponse.data}`);

        return axiosResponse.data;
    };
       

    removeShippingAll = async (  //카트 리스트 초기화
                          
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `shipping_remove`
            ), {
                method: 'GET'
            });
            //console.log(`데이터 확인: ${product_id},  ${axiosResponse.data}`);

        return axiosResponse.data;
    };
    


}

export const ShippingAPI = new ShippingAPIClass();
