const ONE_DAY_IN_MILLISECONDS = 86400000;

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
	// console.log(
	// 	`startDate: ${startDate}\n\n endDate: ${endDate}\n\n endDateToDate: ${endDate.toDate()} \n\n startDateToDate: ${startDate.toDate()} \n\n
	// 	startDateMilli ${startDate.toMillis()}`,
	// );

	// the .toDate method converts date formatting to milliseconds.
	// divinding these days by ONE_DAY_IN_MILLISECONDS, gives you the total
	// ammount of days after the difference is established.
	const difference = startDate.toDate() - endDate.toDate();
	const calculation = Math.floor(difference / ONE_DAY_IN_MILLISECONDS);

	// if number cannot divide evenly into a number more than 1, than less than a day has
	// passed. Defaults to 0.
	if (calculation <= 0) {
		return calculation;
	} else {
		return calculation;
	}
}
