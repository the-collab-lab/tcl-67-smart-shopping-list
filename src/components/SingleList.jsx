import './SingleList.css';

export function SingleList({ name, path, setListPath }) {
	console.log({ name, path, setListPath });
	function handleClick() {
		setListPath(path);
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{path}</button>
		</li>
	);
}
