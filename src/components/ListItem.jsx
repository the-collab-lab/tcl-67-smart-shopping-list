import React, { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useMutation } from 'react-query';

import { getNextPurchasedDate } from '../utils';
import { deleteItem } from '../api/firebase';
import { compareIfDateIsLessThan24Hours, getDaysBetweenDates } from '../utils';

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

	const {
		error: deleteError,
		isLoading: deleteIsLoading,
		mutateAsync: markItemAsDeleteMutation,
	} = useMutation({
		mutationFn: markItemAsDelete,
	});

	const isDisabled = isChecked || purchaseIsLoading;

	const urgency = determineUrgency();

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

	async function markItemAsDelete() {
		await deleteItem(listPath, id);
	}

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

	function determineUrgency(
		a = dateLastPurchased?.toDate(),
		b = dateNextPurchased?.toDate(),
	) {
		const daysBetween = getDaysBetweenDates(a, b);
		if (new Date() > b) {
			return '----------Overdue';
		} else if (daysBetween <= 7) {
			return '----------Purchase Soon';
		} else if (daysBetween > 7 && daysBetween <= 30) {
			return '----------Purchase kind of soon';
		} else if (daysBetween > 30 && daysBetween < 60) {
			return '----------Purchase Not Soon';
		} else if (daysBetween > 60) {
			return '----------Inactive';
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

			<label htmlFor={id}>
				{name}
				{urgency}
			</label>

			<button onClick={handleDeleteItem}>Delete</button>
			{deleteError && <p>Error deleting item</p>}
			{deleteIsLoading && <p>Deleting item...</p>}
			{purchaseError && <p>Error marking as purchased</p>}
			{purchaseIsLoading && <p>Updating item as purchased...</p>}
		</div>
	);
}
