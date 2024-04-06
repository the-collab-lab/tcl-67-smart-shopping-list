import { comparePurchaseUrgency } from '../api';
import { ListItem } from './ListItem';
import { useState } from 'react';
import Button from './Button';

export default function ListSearchItems({ data, listPath }) {
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

	return (
		<section className="listSearchItems">
			{data.length === 0 && (
				<h3 data-testid="noItemsErrorMsg">You have no items in this list!</h3>
			)}
			{data.length !== 0 && (
				<div className="searchSection">
					<label htmlFor="searchItems">Search your shopping list: </label>
					<form action="" onSubmit={(e) => e.preventDefault()}>
						<input
							onChange={handleInputChange}
							id="searchItems"
							value={input}
							type="text"
						/>
					</form>

					<Button
						text="Clear"
						fn={clearSearch}
						color="#DCFF4B"
						shadowAndContainerWidth="100px"
						buttonWidth="92px"
					/>
				</div>
			)}

			{filteredItems.map((item) => (
				<ListItem key={item.id} item={item} listPath={listPath} />
			))}

			{data.length > 0 && filteredItems.length === 0 && (
				<div>
					<p>No match found for that filter query.</p>
				</div>
			)}
		</section>
	);
}
