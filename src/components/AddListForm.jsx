import { useState } from 'react';
import { createList } from '../api/index.js';
import { auth } from '../api/config.js';
import { useNavigate } from 'react-router-dom';

export default function AddListForm({ setListPath }) {
	const [newListName, setNewListName] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		const input = e.target.value;
		setNewListName(input);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (newListName === '') {
			setMessage('Please add a name for your list');
			return;
		}

		try {
			await createList(
				auth.currentUser.uid,
				auth.currentUser.email,
				newListName,
			);
			const newList = `${auth.currentUser.uid}/${newListName}`;
			setListPath(newList);
			setMessage('List created, redirecting in 1 second...');
			setTimeout(() => {
				navigate('/list');
			}, '1000');
		} catch (error) {
			console.error(error);
			setMessage('List not created');
		}
	};

	return (
		<div className="sideBySide-section">
			<div>
				<h3>Create a List</h3>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="newListName" name="newListName">
						List Name
					</label>
					<input id="newListName" name="newListName" onChange={handleChange} />
					<button type="submit">Create List</button>
					<p>{message}</p>
				</form>
			</div>
		</div>
	);
}
