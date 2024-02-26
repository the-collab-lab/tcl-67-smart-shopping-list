import { useState } from 'react';
import { ListItem } from '../components';
import { useNavigate } from 'react-router-dom';

export function List({ data }) {
	const [input, setInput] = useState('');

	const navigate = useNavigate();

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
				{filteredItems.length > 0 ? (
					filteredItems.map((item) => (
						<ListItem key={item.id} name={item.name} />
					))
				) : (
					<div>
						<p>There are no items in this list!</p>
						<button onClick={() => navigate('/manage-list')}>
							Add item to list
						</button>
					</div>
				)}
			</ul>
		</>
	);
}
