import { useState } from 'react';
import { ListItem } from '../components';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import './List.css';
import AddItemForm from '../components/AddItemForm';
import ShareForm from '../components/ShareForm';

export function List({ data, listPath }) {
	console.log(listPath);
	const [input, setInput] = useState('');

	const navigate = useNavigate();

	const sortedItems = comparePurchaseUrgency(data);

	const filteredItems = sortedItems.filter((item) => {
		if (input) {
			const lowerCaseItemName = item.name.toLowerCase();
			return lowerCaseItemName.includes(input.toLowerCase());
		} else {
			return item;
		}
	});

	function handleInputChange(e) {
		e.preventDefault();
		setInput(e.target.value);
	}

	function clearSearch() {
		setInput('');
	}

	if (data.loading) {
		// If data is not loaded yet, render a loading indicator
		return <p>Loading...</p>;
	}

	if (data.data.length === 0) {
		return (
			<>
				<div>
					<p>There are no items in this list!</p>
					<button onClick={() => navigate('/manage-list')}>
						Add item to list
					</button>
				</div>
			</>
		);
	}

	return (
		<>
			<h2>{listPath}</h2>
			<div className="searchInput">
				<form action="" onSubmit={(e) => e.preventDefault()}>
					<label htmlFor="searchItems">Search your shopping list: </label>
					<input
						onChange={handleInputChange}
						id="searchItems"
						value={input}
						type="text"
					/>
				</form>
				<button onClick={clearSearch}>Clear</button>
			</div>

			{data.data.length > 0 && filteredItems.length === 0 && (
				<div>
					<p>No match found for that filter query.</p>
				</div>
			)}
			<AddItemForm />
			{filteredItems.map((item) => (
				<ListItem key={item.id} item={item} listPath={listPath} />
			))}
			<ShareForm />
		</>
	);
}
