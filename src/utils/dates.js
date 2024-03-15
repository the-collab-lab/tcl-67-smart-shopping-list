import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { act } from 'react-dom/test-utils';

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
	let inactiveArr = [];
	const activeMap = new Map();

	data.forEach((item) => {
		const daysBetween = getDaysBetweenDates(
			item.dateLastPurchased?.toDate(),
			item.dateNextPurchased?.toDate(),
		);

		if (daysBetween > 60) {
			inactiveArr.push(item);
		} else {
			activeMap.set(item, daysBetween);
		}
	});

	// Convert activeMap to an array of key-value pairs and sort it by the number of days between dates
	const sortedActiveArray = Array.from(activeMap).sort((a, b) => a[1] - b[1]);

	// Reconstruct activeMap from the sorted array
	const sortedActiveMap = new Map(sortedActiveArray);

	console.log(...sortedActiveMap.values());
	return [...sortedActiveMap.keys(), ...inactiveArr];
}

// export function sortByDaysBetweenDates(data) {
// 	// let activeArr = [];
// 	let inactiveArr = [];
// 	const activeMap = new Map();
// 	let reorderedItems = [];
// 	let currentIndex = 0;
// 	let lowestNum = 0;
// 	// const inActiveMap = new Map();

// 	data.forEach((item) => {
// 		if (
// 			getDaysBetweenDates(
// 				item.dateLastPurchased?.toDate(),
// 				item.dateNextPurchased?.toDate(),
// 			) > 60
// 		) {
// 			inactiveArr.push(item);
// 		} else {
// 			activeMap.set(
// 				item,
// 				getDaysBetweenDates(
// 					item.dateLastPurchased?.toDate(),
// 					item.dateNextPurchased?.toDate(),
// 				),
// 			);
// 		}
// 	});

// 	for (let [key, value] of activeMap) {
// 		for (let [key2, value2] of activeMap) {
// 			if (value2 === lowestNum) {
// 				continue;
// 			} else if (value2 < lowestNum) {
// 				lowestNum = value2;
// 			}
// 		}
// 		// console.log(key.name);
// 	}

// 	console.log(activeMap.values());

// 	// activeArr.sort((a, b) => {
// 	// 	const numOfDaysA = getDaysBetweenDates(
// 	// 		a.dateLastPurchased?.toDate(),
// 	// 		a.dateNextPurchased?.toDate(),
// 	// 	);
// 	// 	const numOfDaysB = getDaysBetweenDates(
// 	// 		b.dateLastPurchased?.toDate(),
// 	// 		b.dateNextPurchased?.toDate(),
// 	// 	);

// 	// 	if (numOfDaysA < numOfDaysB) {
// 	// 		return -1;
// 	// 	}
// 	// 	if (numOfDaysA > numOfDaysB) {
// 	// 		return 1;
// 	// 	}
// 	// 	return 0;
// 	// });

// 	return [...activeMap.keys(), ...inactiveArr];
// }
