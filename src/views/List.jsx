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
		<body>
			<section>
				<h2>{listName}</h2>
			</section>
			<section>
				<AddItemForm listPath={listPath} data={data} />
			</section>
			<section>
				<ListSearchItems listPath={listPath} data={data} />
			</section>
			<section>
				<ShareForm listPath={listPath} />
			</section>
		</body>
	);
}
