import React, { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useMutation } from 'react-query';
import { getNextPurchasedDate } from '../utils';
import { deleteItem } from '../api/firebase';

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

	const isDisabled = isChecked || purchaseError;

	async function handleCheckboxCheck() {
		console.log(name);
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
			try {
				await markItemAsDeleteMutation(listPath, id);
			} catch (error) {
				throw new Error('There was an error deleting the item');
			}
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

			<button onClick={handleDeleteItem}>Delete</button>
			{deleteError && <p>Error deleting item</p>}
			{deleteIsLoading && <p>Deleting item...</p>}
			{purchaseError && <p>Error marking as purchased</p>}
			{purchaseIsLoading && <p>Updating item as purchased...</p>}
		</div>
	);
}
