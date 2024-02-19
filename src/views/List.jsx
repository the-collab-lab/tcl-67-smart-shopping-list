import { useState, useEffect } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [currentItems, setCurrentItems] = useState('');
	const [list, setList] = useState([]);
	const [input, setInput] = useState('');

	function handleInputChange(e) {
		setCurrentItems(e.target.value);
		setInput(e.target.value);
	}

	useEffect(() => {
		const filteredItems = data.filter((item) =>
			item.name.includes(currentItems),
		);
		const newListItems = filteredItems.map((item) => (
			<ListItem key={item.id} name={item.name} />
		));
		setList(newListItems);
	}, [data, currentItems]);

	function clearSearch() {
		setCurrentItems('');
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
			<ul>{list}</ul>
		</>
	);
}
