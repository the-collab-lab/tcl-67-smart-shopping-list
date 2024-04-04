import { Outlet } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';
import { useAuth, SignInButton, SignOutButton } from '../api/useAuth.jsx';
import LoggedOut from '../components/LoggedOut.jsx';
import { useEffect, useState } from 'react';

export function Layout() {
	const { user } = useAuth();
	const [isMobile, setIsMobile] = useState();

	useEffect(() => {
		if (window.innerWidth < 780) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, []);

	return (
		<div className="Layout">
			{!!user ? (
				<>
					<header className="Layout-header">
						<a href="/">
							<h1>Smart shopping list</h1>
						</a>

						{!isMobile && (
							<div>
								<div>
									<span>Welcome, {auth.currentUser.displayName}</span>
								</div>
								<SignOutButton />
							</div>
						)}
					</header>
					<main className="Layout-main">
						<Outlet />
					</main>
					{isMobile && (
						<div className="mobileLogFooter">
							<SignOutButton />
						</div>
					)}
				</>
			) : (
				<>
					<header className="Layout-header">
						<h1>Smart shopping list</h1>
						{!isMobile && (
							<div>
								<SignInButton />
							</div>
						)}
					</header>
					<LoggedOut />
					{isMobile && (
						<div className="mobileLogFooter">
							<SignInButton />
						</div>
					)}
				</>
			)}
		</div>
	);
}
