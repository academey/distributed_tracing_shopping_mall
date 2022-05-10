import dotenv from 'dotenv';
import {requestApi} from './request.js';


dotenv.config();


export class EmailAPIClass {
    getRequestURL(path) {
        return `http://localhost:8007/${path}`; //이부분 .env undefined문제 때문에 string으로 바꾼것 후에 다시 수정해야함.
    }


    sendmail = async (  //id를 통해 정보 얻어오기(특정 product의 세부정보)
                         data = {
                            id,
                            title,
                            receiver,
                            text,  
                          }
                      ) => {

        const axiosResponse = await requestApi(
            this.getRequestURL(
                `email/`
            ), {
                method: 'POST',
                body: data
            });
            //console.log(`데이터 확인: ${product_id},  ${axiosResponse.data}`);

        return axiosResponse.data;
    };
}

export const EmailAPI = new EmailAPIClass();
