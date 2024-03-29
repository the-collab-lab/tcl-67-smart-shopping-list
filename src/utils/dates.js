import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

let ONE_DAY_IN_MILLISECONDS = 86400000;

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

export function compareIfDateIsLessThan24Hours(date) {
	// dividing millisecond difference by 3600000 to get difference in hours
	// then checking if difference is less than 24 hours
	return date && (new Date() - date.toDate()) / 3600000 < 24;
}

export function getDaysBetweenDates(date1, date2) {
	if (!date1 || !date2) {
		return 0;
	}

	const date1Milliseconds = date1.getTime();
	const date2Milliseconds = date2.getTime();

	const milliDiff = Math.abs(date2Milliseconds - date1Milliseconds);
	return Math.floor(milliDiff / ONE_DAY_IN_MILLISECONDS);
}

export function getNextPurchasedDate({
	dateLastPurchased,
	dateNextPurchased,
	totalPurchases,
}) {
	const today = new Date();

	/**
	 * Calculate the previous estimate for purchase
	 * based on historical data
	 */

	const previousEstimate = getDaysBetweenDates(
		dateLastPurchased?.toDate() ? dateLastPurchased?.toDate() : today,
		dateNextPurchased.toDate(),
	);

	/**
	 * Calculate the days since the last purchase,
	 * considering either date last purchased or the created date
	 */
	const daysSinceLastPurchase = getDaysBetweenDates(
		today,
		dateLastPurchased ? dateLastPurchased?.toDate() : today,
	);

	let smartNextPurchaseEstimate = calculateEstimate(
		previousEstimate,
		daysSinceLastPurchase ? daysSinceLastPurchase : previousEstimate,
		totalPurchases,
	);

	// Ensure that the next purchase date is at least one day in the future
	if (smartNextPurchaseEstimate <= 0) {
		smartNextPurchaseEstimate = 1;
	}

	return getFutureDate(smartNextPurchaseEstimate);
}

export function sortByDaysBetweenDates(data) {
	let soonArr = [];
	let notSoonArr = [];
	let kindOfSoonArr = [];
	let overDueArr = [];
	let inactiveArr = [];
	const alphabetSort = (a, b) => a.name.localeCompare(b.name);

	data.forEach((item) => {
		const daysBetween = getDaysBetweenDates(
			item.dateLastPurchased?.toDate(),
			item.dateNextPurchased?.toDate(),
		);

		if (daysBetween > 60) {
			inactiveArr.push(item);
		} else if (
			daysBetween <= 60 &&
			new Date() > item.dateNextPurchased?.toDate()
		) {
			overDueArr.push(item);
		} else if (daysBetween < 7) {
			soonArr.push(item);
		} else if (daysBetween >= 7 && daysBetween < 30) {
			kindOfSoonArr.push(item);
		} else if (daysBetween > 30) {
			notSoonArr.push(item);
		}
	});

	return [
		...overDueArr.sort(alphabetSort),
		...soonArr.sort(alphabetSort),
		...kindOfSoonArr.sort(alphabetSort),
		...notSoonArr.sort(alphabetSort),
		...inactiveArr.sort(alphabetSort),
	];
}
