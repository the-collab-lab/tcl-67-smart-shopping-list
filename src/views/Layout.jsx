import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';
import { useAuth, SignInButton, SignOutButton } from '../api/useAuth.jsx';

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
		<>
			<div className="Layout">
				<header className="Layout-header">
					<NavLink to="/">
						<h1>Smart shopping list</h1>
					</NavLink>
					{!!user ? (
						<div>
							<span>Welcome, {auth.currentUser.displayName}</span> (
							<SignOutButton />)
						</div>
					) : (
						<SignInButton />
					)}
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
			</div>
		</>
	);
}
