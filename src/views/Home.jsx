import './Home.css';
import AddListForm from '../components/AddListForm.jsx';
import SelectListForm from '../components/SelectListForm.jsx';
import { auth } from '../api/config.js';
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
				<div className="welcomeArea">
					<h2>No list currently selected!</h2>
				</div>
			) : (
				<div className="welcomeArea">
					<h4>Welcome, {auth.currentUser.displayName}</h4>
					<small>Current List:</small>
					<h5>{listName}</h5>
				</div>
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
