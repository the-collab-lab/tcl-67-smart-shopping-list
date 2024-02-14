import './Home.css';
import { useState } from 'react';
import { SingleList } from '../components/SingleList.jsx';
import { createList } from '../api/index.js';
import { auth } from '../api/config.js';
import { useNavigate } from 'react-router-dom';

export function Home({ data, setListPath }) {
	const navigate = useNavigate();
	const [listName, setListName] = useState('');
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		setListName(e.target.value);
	};
	console.log(data);
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createList(auth.currentUser.uid, auth.currentUser.email, listName);
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
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="listName" name="listName">
					List Name
				</label>
				<input id="listName" name="listName" onChange={handleChange}></input>
				<button type="submit">Submit</button>
			</form>

			<p>{message}</p>

			<ul>
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
			</ul>
		</div>
	);
}
