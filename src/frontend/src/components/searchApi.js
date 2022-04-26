import {requestApi} from './request.js';

export class SearchAPIClass {
    getRequestURL(path) {
        console.log("process.env is ", process.env);
        // FIXME env 넘기는 법 모르겠음
        // 나중에 참고해라
        // https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/
        // https://tacomanator.medium.com/environments-with-create-react-app-7b645312c09d
        // return `${process.env.REACT_APP_SEARCH_HOST}:${process.env.REACT_APP_SEARCH_PORT}/${path}`;
        // return `search:8001/${path}`;
        if (process.env.NODE_ENV === "development") {
            return `http://localhost:8001/${path}`
        } else {
            return `http://search:8001/${path}`
        }
    }

    loadSearchListData = async () => {
        let requestURL = this.getRequestURL("search");
        console.log('getRequestURL is ', requestURL);
        const axiosResponse = await requestApi(requestURL, {
            method: 'GET'
        });

        return axiosResponse.data;
    };

    loadSearchData = async ({searchId}) => {
        const axiosResponse = await requestApi(this.getRequestURL(`search/${searchId}`), {
            method: 'GET'
        });

        return axiosResponse.data;
    };

    loadPurchaseItemList = async () => {
        let requestURL = this.getRequestURL("purchase_list");
        console.log('getRequestURL is ', requestURL);
        const axiosResponse = await requestApi(requestURL, {
            method: 'GET'
        });
        console.log('axiosResponse is ', axiosResponse);
        return axiosResponse.data;
    };
}

export const SearchAPI = new SearchAPIClass();
