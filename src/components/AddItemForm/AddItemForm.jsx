import { addItem } from '../../api/firebase';
import { useState, useMemo } from 'react';
import { useMutation } from 'react-query';
import { normalizeInput } from '../../utils/stringHelpers';
import { Button } from '../Button/Button';

export function AddItemForm({ data, listPath }) {
	const [message, setMessage] = useState('');
	const [userItem, setUserItem] = useState('');
	// Presetting item duration to 7, as that option starts
	// selected on page rendering.
	const [itemDuration, setItemDuration] = useState(7);

	const {
		isSuccess,
		error,
		isLoading,
		mutateAsync: addItemToListMutation,
	} = useMutation({
		mutationFn: addItemToList,
	});

	const normalizedItemNames = useMemo(() => {
		return data.map((item) => normalizeInput(item.name));
	}, [data]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('');

		if (!userItem.trim()) {
			setMessage('Please enter a name for your item');
			return;
		}

		const normalizedInput = normalizeInput(userItem);
		console.log(normalizedInput, normalizedItemNames);
		if (normalizedItemNames.includes(normalizedInput)) {
			setMessage('Item already exists');
			return;
		}

		await addItemToListMutation({ listPath, userItem, itemDuration });
	};

	async function addItemToList() {
		// throw new Error('Failed to item');
		await addItem(listPath, {
			itemName: userItem,
			daysUntilNextPurchase: itemDuration,
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			{error && (
				<div style={{ padding: 10, background: 'red' }}>{error.message}</div>
			)}
			<div>
				<label htmlFor="itemName">Item Name: </label>
				<input
					onChange={(e) => setUserItem(e.target.value)}
					type="text"
					id="itemName"
					value={userItem}
				/>
			</div>
			<span>Remind me to replace the item in...</span> <br />
			<select
				onChange={(e) => setItemDuration(e.target.value)}
				name="replaceTime"
				value={itemDuration}
			>
				<option value={7}>7 days</option>
				<option value={14}>14 days</option>
				<option value={30}>30 days</option>
			</select>
			<div>
				<Button
					isLoading={isLoading}
					label={'Submit'}
					loadingText={'...Submitting'}
				/>
			</div>
			<div>
				<span>{message}</span>
				{isSuccess && <span>Success!!</span>}
				{/* {error && <span>Unable to add item to list</span>} */}
				{/* {isLoading && <span>Adding...</span>} */}
			</div>
		</form>
	);
}
