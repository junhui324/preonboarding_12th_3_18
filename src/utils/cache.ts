export const getCacheByKey = async (key: string) => {
	const cache = await caches.open('cache');
	const cachedResponse = await cache.match(key);

	if (cachedResponse) {
		const cachedData = await cachedResponse.json();

		if (cachedData.expiry > new Date().getTime()) {
			return cachedData.value;
		}
	}
	return null;
};

export const setCacheByExpireTime = async ({
	key,
	value,
	expireTime = 0,
}: {
	key: string;
	value: string;
	expireTime: number;
}) => {
	const cache = await caches.open('cache');
	const item = {
		value,
		expiry: new Date().getTime() + expireTime,
	};
	const response = new Response(JSON.stringify(item));
	await cache.put(key, response);
};