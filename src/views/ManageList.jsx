import { addItem } from '../api/firebase';
import { useState } from 'react';

export function ManageList({ listPath }) {
	const [message, setMessage] = useState('');
	const [userItem, setUserItem] = useState('');
	// Presetting item duration to 7, as that option starts
	// selected on page rendering.
	const [itemDuration, setItemDuration] = useState(7);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await addItem(listPath, {
				itemName: userItem,
				daysUntilNextPurchase: itemDuration,
			});
			setMessage('Item added to the list!');
		} catch (error) {
			setMessage('Unable to add item to the list.');
			console.log(error);
		}
	};

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>

			<form onSubmit={handleSubmit} method="POST">
				<div>
					<label htmlFor="itemName">Item Name: </label>
					<input
						onChange={(e) => setUserItem(e.target.value)}
						type="text"
						id="itemName"
						value={userItem}
					/>
				</div>
				<span>Remind me to replace item in...</span> <br />
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
					<button>Submit</button>
				</div>
				<div>
					<span>{message}</span>
				</div>
			</form>
		</>
	);
}
