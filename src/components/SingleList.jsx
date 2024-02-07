import './SingleList.css';

export function SingleList({ name, path, setListPath }) {
	function handleClick() {
		setListPath(`${name}/${path}`);
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{path}</button>
		</li>
	);
}
