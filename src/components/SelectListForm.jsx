import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';

export default function SelectListForm({
	data,
	listPath,
	areListsLoading,
	setListPath,
}) {
	const [selectedList, setSelectedList] = useState('');
	const navigate = useNavigate();
	const handleSelectChange = (e) => {
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
					<label htmlFor="listSelector">Select List</label>
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
					<Button
						text="View List"
						fn={() => navigate('/list')}
						color="#DCFF4B"
					/>
				</div>
			)}
			<div>
				<h2>Select a List</h2>
			</div>
		</section>
	);
}
