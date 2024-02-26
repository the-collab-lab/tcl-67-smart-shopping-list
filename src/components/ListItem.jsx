import React, { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';

export function ListItem({ item }) {
	const { id, totalPurchases, name } = item;
	const [isChecked, setIsChecked] = useState(false);
	// on click, update lastPurchased and total purchases for item.
	async function handleCheckboxCheck() {
		setIsChecked(!isChecked);
		console.log(id, totalPurchases);
		try {
			console.log(await updateItem(id, totalPurchases));
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
		</div>
	);
}
