import ShareForm from '../components/ShareForm';
import AddItemForm from '../components/AddItemForm';
import { testFn } from '../api/firebase';

export function ManageList({ listPath, data }) {
	testFn();
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
