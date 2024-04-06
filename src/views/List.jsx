import './List.css';
import AddItemForm from '../components/AddItemForm';
import ShareForm from '../components/ShareForm';
import ListSearchItems from '../components/ListSearchItems';

export function List({ data, isShoppingListLoading, listPath, listName }) {
	if (!listPath) {
		return (
			<>
				<h2 data-testid="noListErrorMsg">You don't have a list selected!</h2>
			</>
		);
	}

	if (isShoppingListLoading) {
		// If data is not loaded yet, render a loading indicator
		return <p>Loading...</p>;
	}

	return (
		<>
			<div className="currentList">
				<small>Current List:</small>
				<h2>{listName}</h2>
			</div>
			<AddItemForm listPath={listPath} data={data} />
			<ListSearchItems listPath={listPath} data={data} />
			<ShareForm listPath={listPath} />
		</>
	);
}
