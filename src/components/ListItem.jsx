import React, { useState } from 'react';
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
			return 'Overdue';
		} else if (daysBetween <= 7) {
			return 'Soon';
		} else if (daysBetween > 7 && daysBetween <= 30) {
			return 'Kind of soon';
		} else if (daysBetween > 30 && daysBetween < 60) {
			return 'Not Soon';
		} else if (daysBetween > 60) {
			return 'Inactive';
		}
	}

	return (
		<div className="listItemRow">
			<span className="checkboxBackground">
				<input
					type="checkbox"
					id={id}
					name="item"
					checked={isDisabled}
					onChange={handleCheckboxCheck}
				/>
			</span>
			<div className="nameAndUrgency">
				<p className="listItemName">{name}</p>
				<p className="listItemUrgency">{urgency}</p>
			</div>
			<div className="deleteButtonContainer">
				<div className="buttonBackSquare"></div>

				<button
					className="buttonDelete"
					onClick={() => {
						handleDeleteItem();
					}}
				>
					<p>+</p>
				</button>
			</div>
			{deleteError && <p>Error deleting item</p>}
			{deleteIsLoading && <p>Deleting item...</p>}
			{purchaseError && <p>Error marking as purchased</p>}
			{purchaseIsLoading && <p>Updating item as purchased...</p>}
		</div>
	);
}
