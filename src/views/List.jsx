import './List.css';
import AddItemForm from '../components/AddItemForm';
import ShareForm from '../components/ShareForm';
import ListSearchItems from '../components/ListSearchItems';

export function List({ data, isShoppingListLoading, listPath }) {
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
			<div>
				<ListSearchItems listPath={listPath} data={data} />
			</div>
			<div>
				<AddItemForm listPath={listPath} data={data} />
			</div>
			<ShareForm listPath={listPath} />
		</>
	);
}
