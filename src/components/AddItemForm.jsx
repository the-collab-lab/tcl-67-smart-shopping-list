import { addItem } from '../api/firebase';
import { useState, useMemo } from 'react';
import { useMutation } from 'react-query';
import { normalizeInput } from '../utils';

async function addItemToList({ listPath, userItem, itemDuration }) {
	return await addItem(listPath, {
		itemName: userItem,
		daysUntilNextPurchase: itemDuration,
	});
}

export default function AddItemForm({ listPath, data }) {
	const [message, setMessage] = useState('');
	const [userItem, setUserItem] = useState('');
	// Presetting item duration to 7, as that option starts
	// selected on page rendering.
	const [itemDuration, setItemDuration] = useState(7);

	const normalizedItemNames = useMemo(() => {
		return data?.data.map((item) => normalizeInput(item.name));
	}, [data?.data]);

	const {
		isSuccess,
		error,
		isLoading,
		reset,
		mutateAsync: addItemToListMutation,
	} = useMutation({
		mutationFn: addItemToList,
	});

	const handleSubmit = async (e) => {
		reset();
		e.preventDefault();
		setMessage('');
		if (!userItem.trim()) {
			setMessage('Please enter a name for your item');
			return;
		}

		const normalizedInput = normalizeInput(userItem);

		if (normalizedItemNames?.includes(normalizedInput)) {
			setMessage('Item already exists');
			return;
		}

		await addItemToListMutation({ listPath, userItem, itemDuration }).catch(
			(e) => console.error(e),
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2 data-testid="addItemForm-header">Add an item to your list</h2>
			<div>
				<label htmlFor="itemName">Item Name: </label>
				<input
					data-testid="itemName"
					onChange={(e) => setUserItem(e.target.value)}
					type="text"
					id="itemName"
					value={userItem}
				/>
			</div>
			<span>Remind me to replace the item in...</span> <br />
			<select
				data-testid="replaceTime"
				onChange={(e) => setItemDuration(e.target.value)}
				name="replaceTime"
				value={itemDuration}
			>
				<option value={7}>7 days</option>
				<option value={14}>14 days</option>
				<option value={30}>30 days</option>
			</select>
			<div>
				<button data-testid="submit-button">Submit</button>
			</div>
			<div>
				<span data-testid="addItemFormMessage">{message}</span>
				{isSuccess && <span data-testid="addItemFormSuccess">Success!!</span>}
				{error && (
					<span data-testid="addItemFormError">Unable to add item to list</span>
				)}
				{isLoading && <span data-testid="addItemFormLoading">Adding...</span>}
			</div>
		</form>
	);
}
