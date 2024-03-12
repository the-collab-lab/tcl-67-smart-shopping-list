import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

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

export function getDaysBetweenDates(dateLastPurchase, dateNextPurchase) {
	// New items are created without a startDate. This avoids null type
	// error on new item creation.
	if (!dateLastPurchase) {
		return;
	}

	// the .toDate method converts date formatting to milliseconds.
	// divinding these days by ONE_DAY_IN_MILLISECONDS, gives you the total
	// ammount of days after the difference is established.
	if (dateLastPurchase && dateNextPurchase) {
		const difference = dateLastPurchase - dateNextPurchase;
		const numOfDaysBetweenCalculation = Math.floor(
			difference / ONE_DAY_IN_MILLISECONDS,
		);

		// if number cannot divide evenly into a number more than 1, than less than a day has
		// passed. Defaults to 0.
		if (numOfDaysBetweenCalculation <= 0) {
			return 0;
		} else {
			return numOfDaysBetweenCalculation;
		}
	}
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

// compare last purchase with current date to get inactive

export function categorizePurchaseStatus(numberOfDays) {
	if (numberOfDays <= 7) {
		return 'Need to buy soon';
	} else if (numberOfDays > 7 && numberOfDays <= 30) {
		return 'Kind of Soon';
	} else if (numberOfDays > 30) {
		return 'Not Soon';
		// } else if (isInactive(dateLastPurchased) === true) {
		// 	return 'Inactive';
	}
}

export function isInactive(dateLastPurchased) {
	const today = new Date();
	const daysSinceLastPurchase = getDaysBetweenDates(
		today,
		dateLastPurchased?.toDate() ? dateLastPurchased?.toDate() : today,
	);
	if (daysSinceLastPurchase > 60) {
		return true;
	}
}
