import { useState } from 'react';
import { ListItem } from '../components';
import { comparePurchaseUrgency } from '../api/firebase';
import './List.css';
import AddItemForm from '../components/AddItemForm';
import ShareForm from '../components/ShareForm';

export function List({ data, isShoppingListLoading, listPath, listName }) {
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

	if (!listPath) {
		return (
			<>
				<h2 data-testid="noListErrorMsg">You don't have a list selected!</h2>
			</>
		);
	}

	if (isShoppingListLoading) {
		// If data is not loaded yet, render a loading indicator
		return <p>Loading...</p>;
	}

	return (
		<>
			<h2>{listName}</h2>
			{data.length === 0 && (
				<h2 data-testid="noItemsErrorMsg">You have no items in this list!</h2>
			)}
			{data.length !== 0 && (
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
			)}
			<div>
				{filteredItems.map((item) => (
					<ListItem key={item.id} item={item} listPath={listPath} />
				))}
			</div>
			{data.length > 0 && filteredItems.length === 0 && (
				<div>
					<p>No match found for that filter query.</p>
				</div>
			)}
			<div>
				<AddItemForm listPath={listPath} data={data} />
			</div>
			<ShareForm listPath={listPath} />
		</>
	);
}
