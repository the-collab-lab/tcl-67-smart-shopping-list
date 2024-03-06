export function Button({ isLoading = false, error, label, loadingText }) {
	return (
		<button
			style={{
				...(error && { background: 'red' }),
			}}
			disabled={isLoading}
		>
			{isLoading ? loadingText : label}
		</button>
	);
}
