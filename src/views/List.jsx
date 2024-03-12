import { useState } from 'react';
import { ListItem } from '../components';
import { useNavigate } from 'react-router-dom';

export function List({ data, listPath }) {
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
			<div className="soon">
				<h2>Soon</h2>
			</div>
			<div className="kindOfSoon">
				<h2>Kind of Soon</h2>
			</div>
			<div className="notSoon">
				<h2>Not Soon</h2>
			</div>
			<div className="inactive">
				<h2>Inactive</h2>
			</div>
			<div className="overdue">
				<h2>Overdue</h2>
			</div>
			<ul>
				{filteredItems.map((item) => (
					<ListItem key={item.id} item={item} listPath={listPath} />
				))}

				{data.length === 0 && (
					<div>
						<p>There are no items in this list!</p>
						<button onClick={() => navigate('/manage-list')}>
							Add item to list
						</button>
					</div>
				)}

				{data.length > 0 && filteredItems.length === 0 && (
					<div>
						<p>No match found for that filter query.</p>
					</div>
				)}
			</ul>
		</>
	);
}
