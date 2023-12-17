/**
 * Helpers
 */
const utils = {


	/**
	 * check that object is not empty
	 */
	isEmptyObj: (obj) => {
		const isEmpty = Object.entries(obj).every(([key, value]) => {
			
			if (Array.isArray(value)) {
				console.log(value.length === 0);
				return value.length === 0;
			} else {
				return value.trim() === '';
			}
		});

		return isEmpty;
	},


};

export default utils;