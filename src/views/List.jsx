import './List.css';
import AddItemForm from '../components/AddItemForm';
import ShareForm from '../components/ShareForm';
import ListSearchItems from '../components/ListSearchItems';
import { SignOutButton } from '../api/useAuth';

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
		<main>
			<section>
				<h2>{listName}</h2>
			</section>
			<section>
				<AddItemForm listPath={listPath} data={data} />
			</section>
			<section>
				<ListSearchItems listPath={listPath} data={data} />
			</section>
			<section className="share">
				<ShareForm listPath={listPath} />
			</section>
			<section className="logOutFooter">
				<SignOutButton />
			</section>
		</main>
	);
}
