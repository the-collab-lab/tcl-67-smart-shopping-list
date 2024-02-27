import React, { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';

export function ListItem({ item, listPath }) {
	console.log(item);
	const { id, totalPurchases, name, dateLastPurchased } = item;
	const [isChecked, setIsChecked] = useState(false);
	// on click, update lastPurchased and total purchases for item.
	async function handleCheckboxCheck() {
		setIsChecked(!isChecked);
		console.log(id, totalPurchases);
		try {
			const updatedItem = await updateItem(listPath, {
				itemId: id,
				totalPurchases: totalPurchases,
			});
			console.log(updatedItem);
		} catch (error) {
			console.error(error);
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
			{dateLastPurchased}
		</div>
	);
}
