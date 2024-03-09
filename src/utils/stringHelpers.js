// lowercases name and removes non-alphanumeric characters
export function normalizeInput(name) {
	return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}
