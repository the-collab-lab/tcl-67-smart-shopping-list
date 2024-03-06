// lowercases name and removes non-alpha characters
export const normalizeInput = (name) => {
	return name.toLowerCase().replace(/[^a-z0-9]/g, '');
};
