export default function Button({
	className,
	value,
	text,
	type,
	color,
	fn,
	testId,
}) {
	return (
		<div class="buttonContainer">
			<span className="buttonBack"></span>

			<button
				className={className}
				value={value}
				type={type}
				onClick={fn}
				style={{ backgroundColor: color }}
				data-testid={testId}
			>
				{text}
			</button>
		</div>
	);
}
