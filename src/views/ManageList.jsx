import { addItem } from '../api/firebase';
import { useState, useMemo } from 'react';
import ShareForm from '../components/ShareForm';
import { useMutation } from 'react-query';

export function ManageList({ listPath, data }) {
	const [message, setMessage] = useState('');
	const [userItem, setUserItem] = useState('');
	// Presetting item duration to 7, as that option starts
	// selected on page rendering.
	const [itemDuration, setItemDuration] = useState(7);

	// lowercases name and removes non-alpha characters
	const normalizeInput = (name) => {
		return name.toLowerCase().replace(/[^a-z0-9]/g, '');
	};

	const normalizedItemNames = useMemo(() => {
		return data.map((item) => normalizeInput(item.name));
	}, [data]);

	const {
		isSuccess,
		error,
		isLoading,
		mutateAsync: addItemToListMutation,
	} = useMutation({
		mutationFn: addItemToList,
	});

	async function addItemToList() {
		await addItem(listPath, {
			itemName: userItem,
			daysUntilNextPurchase: itemDuration,
		});
	}

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
					{isSuccess && <span>Success!!</span>}
					{error && <span>Unable to add item to list</span>}
					{isLoading && <span>Adding...</span>}
				</div>
			</form>
			<ShareForm listPath={listPath} />
		</>
	);
}
