import dotenv from 'dotenv';
import {requestApi} from './request.js';


dotenv.config();


export class InfoAPIClass {
    getRequestURL(path) {
        return `http://${process.env.INFO_HOST}:${process.env.INFO_PORT}/${path}`;
    }

    loadinfo = async () => { //cart_list 전체 호출(현재 cart_list에 있는것들)
        let requestURL = this.getRequestURL(
            "info"
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
            //console.log('axiosResponse is ', axiosResponse);
            return axiosResponse.data;
        } catch (e) {
            console.log('error is ', e);
            return e;
        }
    };

    updateInfo = async ( 
                          
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `info_update`
            ), {
                method: 'GET'
            });
            //console.log(`데이터 확인: ${product_id},  ${axiosResponse.data}`);

        return axiosResponse.data;
    };

    resetInfo = async ( 
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `info_reset`
            ), {
                method: 'GET'
            });
            //console.log(`데이터 확인: ${product_id},  ${axiosResponse.data}`);

        return axiosResponse.data;
    };
       
}

export const InfoAPI = new InfoAPIClass();
