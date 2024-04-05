import { Outlet } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';
import { useAuth } from '../api/useAuth.jsx';
import LoggedOut from '../components/LoggedOut.jsx';
import { useState } from 'react';
import Button from '../components/Button.jsx';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export function Layout() {
	const initialWindowSize = window.innerWidth;

	const { user } = useAuth();
	const [isMobile, setIsMobile] = useState(
		initialWindowSize < 780 ? true : false,
	);

	function windowSizeCheck() {
		if (window.innerWidth < 780 && isMobile === false) {
			setIsMobile(true);
		}
		if (window.innerWidth >= 780 && isMobile === true) {
			setIsMobile(false);
		}
	}

	window.addEventListener('resize', windowSizeCheck);

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
								<Button
									fn={() => auth.signOut()}
									color={'yellow'}
									className={'logOut'}
									text={'Log Out'}
									buttonWidth={'155px'}
									shadowAndContainerWidth={'163px'}
								/>
							</div>
						)}
					</header>
					<main className="Layout-main">
						<Outlet />
					</main>
					{isMobile && (
						<Button
							fn={() => auth.signOut()}
							color={'yellow'}
							className={'logOut'}
							text={'Log Out'}
							buttonWidth={'98%'}
							shadowAndContainerWidth={'100%'}
						/>
					)}
				</>
			) : (
				<>
					<header className="Layout-header">
						<h1>Smart shopping list</h1>
						{!isMobile && (
							<Button
								fn={() => signInWithPopup(auth, new GoogleAuthProvider())}
								color={'yellow'}
								className={'logIn'}
								text={'Log In'}
								buttonWidth={'155px'}
								shadowAndContainerWidth={'163px'}
							/>
						)}
					</header>
					<LoggedOut />
					{isMobile && (
						<Button
							fn={() => signInWithPopup(auth, new GoogleAuthProvider())}
							color={'yellow'}
							className={'logIn'}
							text={'Log In'}
							buttonWidth={'98%'}
							shadowAndContainerWidth={'100%'}
						/>
					)}
				</>
			)}
		</div>
	);
}
