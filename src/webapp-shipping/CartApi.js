import dotenv from 'dotenv';
import {requestApi} from './request.js';


dotenv.config();


export class CartAPIClass {
    getRequestURL(path) {
        return `http://localhost:8008/${path}`; //이부분 .env undefined문제 때문에 string으로 바꾼것 후에 다시 수정해야함.
    }

    loadCartList = async () => { //cart_list 전체 호출(현재 cart_list에 있는것들)
        let requestURL = this.getRequestURL(
            "cart"
        );
        console.log('getRequestURL is ', requestURL);
        /* env 환경변수 제대로 되나 확인용
        console.log(process.env); env자체가 import되었나 확인
        console.log(process.env.NODE_ENV); 우리가 설정한 env가 적용되나 확인
        console.log(process.env.URL_search);
            */
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

    addCart = async (  //id를 통해 정보 얻어오기(카트에 추가할 product의 세부정보)
                          product_id
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `cart_add/${product_id}`
            ), {
                method: 'GET'
            });
            //console.log(`데이터 확인: ${product_id},  ${axiosResponse.data}`);

        return axiosResponse.data;
    };

    removeCart = async (  //id에 해당하는 물품이 cart_list에 있다면, 제거)
                          product_id
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `cart_remove/${product_id}`
            ), {
                method: 'GET'
            });
            //console.log(`데이터 확인: ${product_id},  ${axiosResponse.data}`);

        return axiosResponse.data;
    };
       

    removeCartAll = async (  //카트 리스트 초기화
                          
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `cart_remove`
            ), {
                method: 'GET'
            });
            //console.log(`데이터 확인: ${product_id},  ${axiosResponse.data}`);

        return axiosResponse.data;
    };
}

export const CartAPI = new CartAPIClass();
