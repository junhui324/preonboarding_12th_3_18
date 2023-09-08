import axios from 'axios';
import { getCacheByKey, setCacheByExpireTime } from '../utils/cache';
import { CACHE_DELETE_TIME, URL } from '../constants/constants';

const instance = axios.create({
	baseURL: URL,
});

export const getClinicalTrial = async (query: string) => {
	const cacheItem = await getCacheByKey(query);

	if (cacheItem) {
		return cacheItem;
	}

	console.info('calling api');
	const response = await instance.get(`?q=${query}`);

	setCacheByExpireTime({ key: query, value: response.data, expireTime: CACHE_DELETE_TIME });
	return response.data;
};
