export const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function getDaysBetweenDates(startDate, endDate) {
	// New items are created without a startDate. This avoids null type
	// error on new item creation.
	if (!startDate) {
		return;
	}

	// the .toDate method converts date formatting to milliseconds.
	// divinding these days by ONE_DAY_IN_MILLISECONDS, gives you the total
	// ammount of days after the difference is established.
	if (startDate && endDate) {
		const difference = startDate.toDate() - endDate.toDate();
		const calculation = Math.floor(difference / ONE_DAY_IN_MILLISECONDS);

		// if number cannot divide evenly into a number more than 1, than less than a day has
		// passed. Defaults to 0.
		if (calculation <= 0) {
			return 0;
		} else {
			return calculation;
		}
	}
}
