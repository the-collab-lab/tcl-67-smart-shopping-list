import { useEffect, useState } from 'react';
import { addUserToDatabase } from '../api';
import { auth } from '../api/config';
import { UserContext } from './user';

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((fireBaseUser) => {
			setUser(fireBaseUser);
			if (fireBaseUser) {
				addUserToDatabase(fireBaseUser);
			}
		});
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
