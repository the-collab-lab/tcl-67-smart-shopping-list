import React, { useEffect, useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useMutation } from 'react-query';
import { getNextPurchasedDate, getDaysBetweenDates } from '../utils';

export function ListItem({ item, listPath }) {
	const { id, totalPurchases, name, dateLastPurchased, dateNextPurchased } =
		item;

	const isLessThan24HoursSinceLastPurchased =
		compareIfDateIsLessThan24Hours(dateLastPurchased);

	const [isChecked, setIsChecked] = useState(
		isLessThan24HoursSinceLastPurchased,
	);

	const [urgency, setUrgency] = useState('');

	function determineUrgency(a, b) {
		const daysBetween = getDaysBetweenDates(a, b);
		if (new Date() > b) {
			setUrgency('----------Overdue');
		} else if (daysBetween <= 7) {
			setUrgency('----------Purchase Soon');
		} else if (daysBetween > 7 && daysBetween <= 30) {
			setUrgency('----------Purchase kind of soon');
		} else if (daysBetween > 30 && daysBetween < 60) {
			setUrgency('----------Purchase Not Soon');
		} else if (daysBetween > 60) {
			setUrgency('----------Inactive');
		}
	}

	useEffect(() => {
		determineUrgency(dateLastPurchased?.toDate(), dateNextPurchased?.toDate());
	}, [isChecked, dateLastPurchased, dateNextPurchased]);

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

	async function markAsPurchased() {
		const nextPurchasedDate = getNextPurchasedDate({
			dateLastPurchased,
			dateNextPurchased,
			totalPurchases,
		});

		await updateItem(listPath, {
			itemId: id,
			totalPurchases: totalPurchases,
			dateNextPurchased: nextPurchasedDate,
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
			<label>{urgency}</label>
			{error && <p>Error marking as purchased</p>}
			{isLoading && <p>Updating item as purchased...</p>}
		</div>
	);
}
