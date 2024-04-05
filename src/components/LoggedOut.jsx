import './LoggedOut.css';
export default function LoggedOut() {
	return (
		<section className="sideBySide-loggedOut">
			<div className="loggedOut-message">
				<h2>Plan your next grocery run with CleverCart.</h2>
				<h4>Log in to view your lists.</h4>
			</div>
			<div className="loggedOut-image" />
		</section>
	);
}
