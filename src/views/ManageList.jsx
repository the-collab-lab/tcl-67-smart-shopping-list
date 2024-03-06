import { AddItemForm } from '../components/AddItemForm/AddItemForm';
import ShareForm from '../components/ShareForm';

export function ManageList({ listPath, data }) {
	if (!listPath) {
		return (
			<>
				<span>Currently, there is no list set to manage items for.</span>
			</>
		);
	}

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<AddItemForm listPath={listPath} data={data} />
			<ShareForm listPath={listPath} />
		</>
	);
}
