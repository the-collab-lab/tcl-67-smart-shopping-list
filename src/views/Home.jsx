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
				<h2>No list currently selected!</h2>
			) : (
				<h5>Current List:{listName}</h5>
			)}

			<AddListForm setListPath={setListPath} />

			<SelectListForm
				data={data}
				areListsLoading={areListsLoading}
				setListPath={setListPath}
				listName={listName}
			/>
		</div>
	);
}
