import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data, listPath }) {
	const [input, setInput] = useState('');

	const filteredItems = data.filter((item) => {
		if (input) {
			const lowerCaseItemName = item.name.toLowerCase();
			return lowerCaseItemName.includes(input.toLowerCase());
		} else {
			return item;
		}
	});

	function handleInputChange(e) {
		setInput(e.target.value);
	}

	function clearSearch() {
		setInput('');
	}

	return (
		<>
			<form action="">
				<label htmlFor="searchItems">Search Items: </label>
				<input
					onChange={handleInputChange}
					id="searchItems"
					value={input}
					type="text"
				/>
			</form>
			<button onClick={clearSearch}>X</button>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{filteredItems.map((item) => (
					<ListItem key={item.id} item={item} listPath={listPath} />
				))}
			</ul>
		</>
	);
}
