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

		<div className="Layout">
			{!!user ? (
				<>
					<header className="Layout-header">
						<h1>Smart shopping list</h1>
						<div>
							<span>Welcome, {auth.currentUser.displayName}</span> (
							<SignOutButton />)
						</div>
					</header>
					<main className="Layout-main">
						<Outlet />
					</main>
					<nav className="Nav">
						<div className="Nav-container">
							<NavLink to="/" className="Nav-link">
								Home
							</NavLink>
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
						</div>
					</nav>
				</>
			) : (
				<>
					<header className="Layout-header">
						<h1>Smart shopping list</h1>
						<div>
							<SignInButton />
						</div>
					</header>
					<div>Please sign in to view lists.</div>
				</>
			)}
		</div>
	);
}
