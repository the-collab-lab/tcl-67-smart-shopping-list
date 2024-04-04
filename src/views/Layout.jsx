import { Outlet } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';
import { useAuth, SignInButton, SignOutButton } from '../api/useAuth.jsx';
import LoggedOut from '../components/LoggedOut.jsx';

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
							<span>Welcome, {auth.currentUser.displayName}</span>
						</div>
						<SignOutButton />
					</header>
					<main className="Layout-main">
						<Outlet />
						<SignOutButton />
					</main>
				</>
			) : (
				<>
					<header className="Layout-header logged-out">
						<h1>Smart shopping list</h1>
						<SignInButton />
					</header>
					<LoggedOut />
					<SignInButton />
				</>
			)}
		</div>
	);
}
