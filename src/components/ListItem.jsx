import React, { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';

export function ListItem({ item, listPath }) {
	const { id, totalPurchases, name, dateLastPurchased } = item;

	const isLessThan24HoursSinceLastPurchased =
		compareIfDateIsLessThan24Hours(dateLastPurchased);

	const [isChecked, setIsChecked] = useState(
		isLessThan24HoursSinceLastPurchased || false,
	);

	function compareIfDateIsLessThan24Hours(date) {
		return date && (new Date() - date.toDate()) / 3600000 < 24;
	}

	async function handleCheckboxCheck() {
		setIsChecked(!isChecked);
		if (!isChecked) {
			try {
				await updateItem(listPath, {
					itemId: id,
					totalPurchases: totalPurchases,
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	return (
		<div>
			<input
				type="checkbox"
				id="item"
				name="item"
				checked={isChecked}
				onChange={handleCheckboxCheck}
			/>
			<label htmlFor="item">{name}</label>
		</div>
	);
}
