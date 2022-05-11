import dotenv from 'dotenv';
import {requestApi} from './request.js';


dotenv.config();


export class CurrencyAPIClass {
    getRequestURL(path) {
        return `http://localhost:8005/${path}`; //이부분 .env undefined문제 때문에 string으로 바꾼것 후에 다시 수정해야함.
    }

    loadCurrencyList = async () => { //product list 전체 호출
        let requestURL = this.getRequestURL(
            "currency"
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

    loadcurrency = async (  //id를 통해 정보 얻어오기(특정 product의 세부정보)
                          currency_id
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `currency/${currency_id}`
            ), {
                method: 'GET'
            });
            //console.log(`데이터 확인: ${currency_id},  ${axiosResponse.data}`);

        return axiosResponse.data;
    };
}

export const CurrencyAPI = new CurrencyAPIClass();
