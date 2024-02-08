import { ListItem } from '../components';

export function List({ data }) {
	const listItems = data.map((data) => {
		return <ListItem key={data.id} name={data.name} />;
	});

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{/**
				 * TODO: write some JavaScript that renders the `data` array
				 * using the `ListItem` component that's imported at the top
				 * of this file.
				 */}
				{listItems}
			</ul>
		</>
	);
}
