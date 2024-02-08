import './Home.css';
import { SingleList } from '../components/SingleList.jsx';

export function Home({ data, setListPath }) {
	const singleList = data.map((data) => {
		return (
			<SingleList
				key={data.name}
				name={data.name}
				path={data.path}
				setListPath={setListPath}
			/>
		);
	});
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{/**
				 * TODO: write some JavaScript that renders the `lists` array
				 * so we can see which lists the user has access to.
				 */}
				{singleList}
			</ul>
		</div>
	);
}
