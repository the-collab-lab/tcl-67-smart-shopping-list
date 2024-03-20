import './Home.css';
import { useState } from 'react';
import AddListForm from '../components/AddListForm.jsx';
import { useNavigate } from 'react-router-dom';
export function Home({ data, setListPath, listPath, listName }) {
	console.log(data, listName);
	const [selectedList, setSelectedList] = useState(listPath);
	const navigate = useNavigate();
	const handleSelectChange = (e) => {
		const input = e.target.value;
		setListPath(input);
		setSelectedList(input?.split('/')[1]);
	};

	return (
		<div className="Home">
			<h4>Current List:</h4>
			<h2>{listName}</h2>
			<hr></hr>
			<AddListForm setListPath={setListPath} />
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
							<option key={data.path} value={data.path}>
								{data.name}
							</option>
							// <SingleList
							// 	key={data.name}
							// 	name={data.name}
							// 	path={data.path}
							// 	setListPath={setListPath}
							// />
						);
					})}
				</select>
				<button onClick={() => navigate('/list')}>View List</button>
			</div>
		</div>
	);
}
