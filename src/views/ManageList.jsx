import { addItem } from '../api/firebase';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

export function ManageList() {
	const [message, setMessage] = useState('');
	const [userItem, setUserItem] = useState('');
	const [itemDuration, setItemDuration] = useState('soon');

	// important for gaining current user information via Firebase
	const auth = getAuth();
	const user = auth.currentUser;

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// I believe the current trouble lies within the path to addItem, which
			// would be the first argument for this function. I've tried a variety of different paths,
			// with preceeding ./ and users/ paths and so on, but I think I'm flat out unable to add a document
			// to a path where sharedList is should be located but I getting either keep getting the following error:
			// FirebaseError: Expected type '_DocumentReference', but it was: a custom _CollectionReference object...

			await addItem(`${user.email}/sharedLists/`, {
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
				<select
					onChange={(e) => setItemDuration(e.target.value)}
					name="replaceTime"
					value={itemDuration}
				>
					<option value={'soon'}>Soon</option>
					<option value={'kindOfSoon'}>Kind of soon</option>
					<option value={'notSoon'}>Not Soon</option>
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
