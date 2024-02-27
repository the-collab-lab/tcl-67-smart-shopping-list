import React, { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';

export function ListItem({ item, listPath }) {
	const { id, totalPurchases, name, dateLastPurchased } = item;
	const lessThan24HoursSincePurchase =
		dateLastPurchased &&
		(new Date() - dateLastPurchased.toDate()) / 3600000 < 24;

	const [isChecked, setIsChecked] = useState(
		lessThan24HoursSincePurchase || false,
	);

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
