import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SelectListForm({
	data,
	areListsLoading,
	listName,
	setListPath,
}) {
	const [selectedList, setSelectedList] = useState(listName);
	const navigate = useNavigate();
	const handleSelectChange = (e) => {
		e.preventDefault();
		const input = e.target.value;
		setListPath(input);
		setSelectedList(input?.split('/')[1]);
	};

	return (
		<section className="sideBySide-section">
			{areListsLoading ? (
				<div>Loading lists...</div>
			) : (
				<div>
					<select
						id="listSelector"
						value={selectedList}
						onChange={handleSelectChange}
					>
						<option value={selectedList}>{selectedList}</option>
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
			)}
			<div>
				<h3>
					<label htmlFor="listSelector">Select a List</label>
				</h3>
			</div>
		</section>
	);
}
