export const sleep = async (ms = 200) =>
	await new Promise((resolve) => setTimeout(() => resolve(null), ms));
