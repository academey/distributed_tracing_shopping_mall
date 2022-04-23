import {requestApi} from './request.js';

export class SearchAPIClass {
    getRequestURL(path) {
        console.log("process.env is ", process.env);
        return `${process.env.REACT_APP_SEARCH_HOST}:${process.env.REACT_APP_SEARCH_PORT}/${path}`;
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

        return axiosResponse.data;
    };
}

export const SearchAPI = new SearchAPIClass();
