/**
 * Abstract utility for handling Fetch API requests.
 */
const api = {
	/**
	 * GET request
	 */
	get: async (url) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Request failed with status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			console.error('GET request error:', error.message);
			throw error;
		}
	},

	/**
	 * POST request
	 */
	post: async (url, data) => {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error(`Request failed with status: ${response.status}`);
			}

			return response.json();
		} catch (error) {
			console.error('POST request error:', error.message);
			throw error;
		}
	},
};

export default api;