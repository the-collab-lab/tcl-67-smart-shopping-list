import './SingleList.css';

export function SingleList({ name, path, setListPath }) {
	function handleChange() {
		setListPath(path);
	}

	return <option onChange={handleChange}>{name}</option>;
}
