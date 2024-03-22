import { useState } from 'react';
import { ListItem } from '../components';
import { comparePurchaseUrgency } from '../api/firebase';
import './List.css';
import AddItemForm from '../components/AddItemForm';
import ShareForm from '../components/ShareForm';

export function List({ data, listPath }) {
	const [input, setInput] = useState('');

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

	const listName = listPath?.substring(listPath.indexOf('/') + 1);

	if (data.data.length === 0) {
		return (
			<>
				<h2>You have no items in this list!</h2>
				<AddItemForm listPath={listPath} />
			</>
		);
	}

	if (data.loading) {
		// If data is not loaded yet, render a loading indicator
		return <p>Loading...</p>;
	}

	return (
		<>
			<h2>{listName}</h2>
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
			<div></div>
			{filteredItems.map((item) => (
				<ListItem key={item.id} item={item} listPath={listPath} />
			))}

			{data.data.length > 0 && filteredItems.length === 0 && (
				<div>
					<p>No match found for that filter query.</p>
				</div>
			)}
			<AddItemForm listPath={listPath} />
			<div></div>
			<ShareForm listPath={listPath} />
		</>
	);
}
