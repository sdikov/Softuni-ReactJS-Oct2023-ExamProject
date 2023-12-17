/**
 * Abstract utility for handling Fetch API requests.
 */
const api = {

	/**
	 * Generic 
	 */
	request: async (url, options) => {
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Request failed with status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			console.error('Request error:', error.message);
			throw error;
		}
	},

	/**
	 * GET request
	 */
	get: async (url) => {
		return api.request(url);
	},

	/**
	 * POST request
	 */
	post: async (url, data) => {
		return api.request(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	},

	/**
	 * PUT request
	 */
	put: async (url, data) => {
		return api.request(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	},

	/**
	 * DELETE request
	 */
	delete: async (url) => {
		return api.request(url, {
			method: 'DELETE',
		});
	},
};

export default api;