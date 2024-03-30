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
				<h4>Current List:{listName}</h4>
			)}

			<AddListForm setListPath={setListPath} />

			<SelectListForm
				data={data}
				listPath={listPath}
				areListsLoading={areListsLoading}
				setListPath={setListPath}
			/>
		</div>
	);
}
