import { addItem } from '../api/firebase';
import { useState } from 'react';
import ShareForm from '../components/ShareForm';

export function ManageList({ listPath, data }) {
	const [message, setMessage] = useState('');
	const [userItem, setUserItem] = useState('');
	// Presetting item duration to 7, as that option starts
	// selected on page rendering.
	const [itemDuration, setItemDuration] = useState(7);

	// lowercases name and removes non-alpha characters
	const normalizeInput = (name) => {
		const alphabet = 'abcdefghijklmnopqrstuvwxyz';
		name = name.toLowerCase();
		return name
			.split('')
			.filter((char) => alphabet.includes(char))
			.join('');
	};

	const normalizedItemNames = data.map((item) => normalizeInput(item.name));

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (userItem.trim() === '') {
			setMessage('Please enter a name for your item');
			return;
		}

		const normalizedInput = normalizeInput(userItem);

		if (normalizedItemNames.includes(normalizedInput)) {
			setMessage('Item already exists');
			return;
		}

		try {
			await addItem(listPath, {
				itemName: userItem,
				daysUntilNextPurchase: itemDuration,
			});
			setMessage('Item added to the list!');
		} catch (error) {
			setMessage('Unable to add item to the list.');
			console.error(error);
		}
	};

	if (!listPath) {
		return (
			<>
				<span>Currently, there is no list set to manage items for.</span>
			</>
		);
	}

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>

			<form onSubmit={handleSubmit}>
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
					<button>Submit</button>
				</div>
				<div>
					<span>{message}</span>
				</div>
			</form>
			<ShareForm listPath={listPath} />
		</>
	);
}
