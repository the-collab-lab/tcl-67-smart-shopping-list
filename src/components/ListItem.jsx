import React, { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useMutation } from 'react-query';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { getDaysBetweenDates, ONE_DAY_IN_MILLISECONDS } from '../utils/dates';
import { Timestamp } from 'firebase/firestore';

export function ListItem({ item, listPath }) {
	const { id, totalPurchases, name, dateLastPurchased, dateNextPurchased } =
		item;

	const isLessThan24HoursSinceLastPurchased =
		compareIfDateIsLessThan24Hours(dateLastPurchased);

	const [isChecked, setIsChecked] = useState(
		isLessThan24HoursSinceLastPurchased,
	);

	function compareIfDateIsLessThan24Hours(date) {
		// dividing millisecond difference by 3600000 to get difference in hours
		// then checking if difference is less than 24 hours
		return date && (new Date() - date.toDate()) / 3600000 < 24;
	}

	const {
		error,
		isLoading,
		mutateAsync: markAsPurchasedMutation,
	} = useMutation({
		mutationFn: markAsPurchased,
	});

	const previousEstimate = getDaysBetweenDates(
		dateNextPurchased,
		dateLastPurchased,
	);

	function estimateAddedToNow() {
		// converts estmated days to milliseconds, and then adds it to current time
		// milliseconds.
		const estDaysToMilli =
			calculateEstimate(
				previousEstimate,
				getDaysBetweenDates(Timestamp.now(), dateLastPurchased),
				totalPurchases,
			) * ONE_DAY_IN_MILLISECONDS;

		const currentDate = Timestamp.now().toDate();

		//adding milliseconds to date
		currentDate.setTime(currentDate.getTime() + estDaysToMilli);

		const updatedTimeSTamp = Timestamp.fromDate(currentDate);

		console.log(updatedTimeSTamp.toDate());
		return updatedTimeSTamp.toDate();
	}

	async function markAsPurchased() {
		await updateItem(listPath, {
			itemId: id,
			totalPurchases: totalPurchases,
			dateNextPurchased: estimateAddedToNow(),
		});
	}

	const isDisabled = isChecked || isLoading;

	async function handleCheckboxCheck() {
		setIsChecked(!isChecked);
		if (!isChecked) {
			await markAsPurchasedMutation({
				listPath,
				id,
				totalPurchases,
				dateNextPurchased,
			});
		}
	}

	return (
		<div>
			<input
				type="checkbox"
				id="item"
				name="item"
				checked={isDisabled}
				onChange={handleCheckboxCheck}
			/>
			<label htmlFor="item">{name}</label>
			{error && <p>Error marking as purchased</p>}
			{isLoading && <p>Updating item as purchased...</p>}
		</div>
	);
}
