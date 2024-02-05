import { ListItem } from '../components';

export function List({ data }) {
	const listItems = data.map((data) => (
		<li key={data.id}>
			<ListItem name={data.name} />
		</li>
	));
	console.log(data);

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
