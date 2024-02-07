import { useEffect } from 'react';
import './Home.css';
import { useAuth } from '../api';

export function Home({ data, setListPath }) {
	const { user } = useAuth();

	useEffect(() => {
		setListPath(`${data.name}/${data.path}`);
	}, []);

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
			</ul>
		</div>
	);
}
