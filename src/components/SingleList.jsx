import './SingleList.css';

export function SingleList({ name, path, setListPath }) {
	function handleClick() {
		setListPath(path);
	}

	return <option onClick={handleClick}>{name}</option>;
}
