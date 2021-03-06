import {requestApi} from './request.js';

export class SearchAPIClass {
    getRequestURL(path) {
        // return `${process.env.SEARCH_HOST}:${process.env.SEARCH_PORT}/${path}`;
        return `${process.env.SEARCH_HOST}:${process.env.SEARCH_PORT}/${path}`;
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
}

export const SearchAPI = new SearchAPIClass();
