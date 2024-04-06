export default function Button({
	className,
	value,
	text,
	type,
	color,
	fn,
	testId,
	buttonWidth,
	shadowAndContainerWidth,
}) {
	return (
		<div className="buttonContainer" style={{ width: shadowAndContainerWidth }}>
			<span
				className="buttonBack"
				style={{ width: shadowAndContainerWidth }}
			></span>
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
		</div>
	);
}
