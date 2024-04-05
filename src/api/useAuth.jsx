import { useContext } from 'react';
import { auth } from './config.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UserContext } from '../context/user.js';
import Button from '../components/Button.jsx';

/**
 * A button that signs the user in using Google OAuth. When clicked,
 * the button redirects the user to the Google OAuth sign-in page.
 * After the user signs in, they are redirected back to the app.
 */
export const SignInButton = ({ className, value }) => (
	<Button
		className={className}
		value={value}
		text="Sign in"
		type="button"
		fn={() => signInWithPopup(auth, new GoogleAuthProvider())}
		color="yellow"
	/>
);

/**
 * A button that signs the user out of the app using Firebase Auth.
 */
export const SignOutButton = () => (
	<Button
		className="signOut"
		text="Sign out"
		type="button"
		fn={() => auth.signOut()}
		color="yellow"
	/>
);

/**
 * A custom hook that listens for changes to the user's auth state.
 * Check out the Firebase docs for more info on auth listeners:
 * @see https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
 */
export const useAuth = () => {
	const { user } = useContext(UserContext);

	return { user };
};
