import React, { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useMutation } from 'react-query';
import { getNextPurchasedDate } from '../utils';
import { deleteItem } from '../api/firebase';
import { compareIfDateIsLessThan24Hours } from '../utils';
export function ListItem({ item, listPath }) {
	const { id, totalPurchases, name, dateLastPurchased, dateNextPurchased } =
		item;

	const isLessThan24HoursSinceLastPurchased =
		compareIfDateIsLessThan24Hours(dateLastPurchased);

	const [isChecked, setIsChecked] = useState(
		isLessThan24HoursSinceLastPurchased,
	);

	const {
		error: purchaseError,
		isLoading: purchaseIsLoading,
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

	const {
		error: deleteError,
		isLoading: deleteIsLoading,
		mutateAsync: markItemAsDeleteMutation,
	} = useMutation({
		mutationFn: markItemAsDelete,
	});

	async function markItemAsDelete() {
		await deleteItem(listPath, id);
	}

	const isDisabled = isChecked || purchaseIsLoading;

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

	async function handleDeleteItem() {
		if (window.confirm(`Do you really want to delete ${name}?`)) {
			await markItemAsDeleteMutation(listPath, id).catch((e) => {
				throw new Error('There was an error deleting the item');
			});
		}
	}

	return (
		<div>
			<input
				type="checkbox"
				id={id}
				name="item"
				checked={isDisabled}
				onChange={handleCheckboxCheck}
			/>
			<label htmlFor={id}>{name}</label>

			<button onClick={handleDeleteItem}>Delete</button>
			{deleteError && <p>Error deleting item</p>}
			{deleteIsLoading && <p>Deleting item...</p>}
			{purchaseError && <p>Error marking as purchased</p>}
			{purchaseIsLoading && <p>Updating item as purchased...</p>}
		</div>
	);
}
