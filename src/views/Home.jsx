import './Home.css';
import AddListForm from '../components/AddListForm.jsx';
import SelectListForm from '../components/SelectListForm.jsx';

export function Home({
	data,
	areListsLoading,
	setListPath,
	listPath,
	listName,
}) {
	return (
		<div className="Home">
			{!listPath ? (
				<h4>No list currently selected!</h4>
			) : (
				<h4>Current List:</h4>
			)}

			<h2>{listName}</h2>
			<hr></hr>
			<AddListForm setListPath={setListPath} />
			<div>
				<p>----- OR -----</p>
			</div>
			{areListsLoading ? (
				<div>Loading lists...</div>
			) : (
				<SelectListForm
					data={data}
					listPath={listPath}
					setListPath={setListPath}
				/>
			)}
		</div>
	);
}
