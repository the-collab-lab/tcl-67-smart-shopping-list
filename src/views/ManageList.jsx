import ShareForm from '../components/ShareForm';
import AddItemForm from '../components/AddItemForm';

export function ManageList({ listPath, data }) {
	if (!listPath) {
		return (
			<>
				<span data-testid="no-listpath-span">
					Currently, there is no list set to manage items for.
				</span>
			</>
		);
	}

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<AddItemForm data-testid="addItemForm" listPath={listPath} data={data} />
			<ShareForm data-testid="shareForm" listPath={listPath} />
		</>
	);
}
