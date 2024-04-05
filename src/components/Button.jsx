export default function Button({
	className,
	value,
	text,
	type,
	color,
	fn,
	testId,
	buttonWidth,
}) {
	return (
		<button
			className={className}
			value={value}
			type={type}
			onClick={fn}
			style={{ backgroundColor: color, width: buttonWidth }}
			data-testid={testId}
		>
			{text}
		</button>
	);
}
