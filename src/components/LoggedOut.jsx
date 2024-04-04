export default function LoggedOut() {
	return (
		<section className="sideBySide-loggedOut">
			<div>
				<h2>Log in to view your lists.</h2>
				<h2>Plan your next grocery run with smart shopping list.</h2>
			</div>
			<div>
				<svg width="100%" height="100%">
					<rect width="100%" height="100%" fill="#fdfd18" />
					<line
						x1="0"
						y1="20%"
						x2="20%"
						y2="0"
						stroke="#dcff4b"
						style={{ strokeWidth: '50px' }}
					/>
					<line
						x1="0"
						y1="60%"
						x2="60%"
						y2="0"
						stroke="#dcff4b"
						style={{ strokeWidth: '15px' }}
					/>
					<line
						x1="0"
						y1="100%"
						x2="100%"
						y2="0"
						stroke="#dcff4b"
						style={{ strokeWidth: '15px' }}
					/>
					<line
						x1="40%"
						y1="100%"
						x2="100%"
						y2="40%"
						stroke="#dcff4b"
						style={{ strokeWidth: '15px' }}
					/>
					<line
						x1="80%"
						y1="100%"
						x2="100%"
						y2="80%"
						stroke="#dcff4b"
						style={{ strokeWidth: '15px' }}
					/>
				</svg>
			</div>
		</section>
	);
}
