import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Layout, List } from './views';

import { useAuth } from './api';

import { useShoppingListData, useShoppingLists } from './api';

import { useStateWithStorage } from './utils';

import { QueryClientProvider, QueryClient } from 'react-query';

export const queryClient = new QueryClient();

export function App() {
	/**
	 * This custom hook takes the path of a shopping list
	 * in our database and syncs it with localStorage for later use.
	 * Check ./utils/hooks.js for its implementation.
	 *
	 * We'll later use `setListPath` when we allow a user
	 * to create and switch between lists.
	 */
	const [listPath, setListPath] = useStateWithStorage(
		'tcl-shopping-list-path',
		null,
	);

	const listName = listPath?.split('/')[1];

	/**
	 * This custom hook holds info about the current signed in user.
	 * Check ./api/useAuth.jsx for its implementation.
	 */
	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;

	/**
	 * This custom hook takes a user ID and email and fetches
	 * the shopping lists that the user has access to.
	 * Check ./api/firestore.js for its implementation.
	 */
	const { listsData, areListsLoading } = useShoppingLists(userId, userEmail);
	/**
	 * This custom hook takes our token and fetches the data for our list.
	 * Check ./api/firestore.js for its implementation.
	 */
	const { shoppingListData, isShoppingListLoading } =
		useShoppingListData(listPath);

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route
							index
							element={
								<Home
									data={listsData}
									areListsLoading={areListsLoading}
									listPath={listPath}
									setListPath={setListPath}
									listName={listName}
									exact
								/>
							}
						/>
						<Route
							path="/list"
							element={
								<List
									data={shoppingListData}
									isShoppingListLoading={isShoppingListLoading}
									listPath={listPath}
									listName={listName}
								/>
							}
						/>
					</Route>
				</Routes>
			</Router>
		</QueryClientProvider>
	);
}
