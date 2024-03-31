import { Outlet } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';
import { useAuth, SignInButton, SignOutButton } from '../api/useAuth.jsx';
import LoggedOut from '../components/LoggedOut.jsx';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	const { user } = useAuth();
	return (
		<div className="Layout">
			{!!user ? (
				<>
					<header className="Layout-header">
						<a href="/">
							<h1>Smart shopping list</h1>
						</a>

						<div>
							<span>Welcome, {auth.currentUser.displayName}</span> (
							<SignOutButton />)
						</div>
					</header>
					<main className="Layout-main">
						<Outlet />
					</main>
				</>
			) : (
				<>
					<header className="Layout-header">
						<h1>Smart shopping list</h1>
						<div>
							<SignInButton />
						</div>
					</header>
					<LoggedOut />
				</>
			)}
		</div>
	);
}
