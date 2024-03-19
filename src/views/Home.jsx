import './Home.css';
import { useState } from 'react';
import { SingleList } from '../components/SingleList.jsx';
import { createList } from '../api/index.js';
import { auth } from '../api/config.js';
import { useNavigate } from 'react-router-dom';

export function Home({ data, setListPath, listName }) {
	const navigate = useNavigate();
	const [newListName, setnewListName] = useState('');
	const [message, setMessage] = useState('');
	const [selectedList, setSelectedList] = useState(listName);

	const handleChange = (e) => {
		setnewListName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createList(
				auth.currentUser.uid,
				auth.currentUser.email,
				newListName,
			);
			setMessage('List created, redirecting in 1 second...');
			setTimeout(() => {
				navigate('/list');
			}, '1000');
		} catch (error) {
			console.error(error);
			setMessage('List not created');
		}
	};

	const handleSelectChange = (e) => {
		setSelectedList(e.target.value);
	};

	return (
		<div className="Home">
			<h4>Current List:</h4>
			<h2>{listName}</h2>
			<hr></hr>
			<div>
				<h3>Create a List</h3>
				<form onSubmit={handleSubmit}>
					<label htmlFor="newListName" name="newListName">
						List Name
					</label>
					<input id="newListName" name="newListName" onChange={handleChange} />
					<button type="submit">Create List</button>
				</form>

				<p>{message}</p>
			</div>
			<hr></hr>

			<div>
				<h3>
					<label htmlFor="listSelector">Select a List</label>
				</h3>
				<select
					id="listSelector"
					value={selectedList}
					onChange={handleSelectChange}
				>
					{data.map((data) => {
						return (
							<SingleList
								key={data.name}
								name={data.name}
								path={data.path}
								setListPath={setListPath}
							/>
						);
					})}
				</select>
				<button onClick={() => navigate('/list')}>View List</button>
			</div>
		</div>
	);
}
