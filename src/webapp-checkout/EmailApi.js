import dotenv from 'dotenv';
import {requestApi} from './request.js';


dotenv.config();


export class EmailAPIClass {
    getRequestURL(path) {
        return `http://${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}/${path}`;
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
