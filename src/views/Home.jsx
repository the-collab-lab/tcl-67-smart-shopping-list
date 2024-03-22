import './Home.css';
import AddListForm from '../components/AddListForm.jsx';
import SelectListForm from '../components/SelectListForm.jsx';
export function Home({ data, setListPath, listPath, listName }) {
	console.log(data);
	return (
		<div className="Home">
			<h4>Current List:</h4>
			<h2>{listName}</h2>
			<hr></hr>
			<AddListForm setListPath={setListPath} />
			<div>
				<p>----- OR -----</p>
			</div>
			<SelectListForm
				data={data}
				listPath={listPath}
				setListPath={setListPath}
			/>
		</div>
	);
}
