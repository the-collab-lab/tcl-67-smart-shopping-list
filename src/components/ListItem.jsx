import React, { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useMutation } from 'react-query';

export function ListItem({ item, listPath }) {
	const { id, totalPurchases, name, dateLastPurchased } = item;

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

	async function markAsPurchased() {
		await updateItem(listPath, {
			itemId: id,
			totalPurchases: totalPurchases,
		});
	}

	const isDisabled = isChecked || isLoading;

	async function handleCheckboxCheck() {
		setIsChecked(!isChecked);
		if (!isChecked) {
			await markAsPurchasedMutation({ listPath, id, totalPurchases });
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
