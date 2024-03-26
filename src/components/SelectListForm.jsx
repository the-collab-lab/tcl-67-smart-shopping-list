import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SelectListForm({ data, listPath, setListPath }) {
	const [selectedList, setSelectedList] = useState('');
	const navigate = useNavigate();
	const handleSelectChange = (e) => {
		const input = e.target.value;
		setListPath(input);
		setSelectedList(input?.split('/')[1]);
	};
	return (
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
					);
				})}
			</select>
			<button onClick={() => navigate('/list')}>View List</button>
		</div>
	);
}
