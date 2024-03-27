import { render, screen } from '@testing-library/react';
import { List } from '../../../src/views';
import { vi } from 'vitest';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../../../src/App';

describe('List', () => {
	afterEach(() => {
		vi.resetAllMocks();
		vi.clearAllMocks();
	});

	const renderList = ({ data, isShoppingListLoading, listPath, listName }) => {
		return render(
			<QueryClientProvider client={queryClient}>
				<List
					data={data}
					isShoppingListLoading={isShoppingListLoading}
					listPath={listPath}
					listName={listName}
				/>
			</QueryClientProvider>,
		);
	};

	it('renders AddItemForm and ShareForm if listPath is passed in', async () => {
		const listProps = {
			data: [{ name: 'apple' }],
			isShoppingListLoading: false,
			listPath: '/test-list',
			listName: 'test-list',
		};
		renderList(listProps);

		const addItemForm = screen.queryByTestId('addItemForm-header');
		const shareForm = screen.queryByTestId('shareForm-header');
		expect(addItemForm).toBeInTheDocument();
		expect(shareForm).toBeInTheDocument();

		const noListPathMessage = screen.queryByTestId('no-listpath-span');
		expect(noListPathMessage).toBeFalsy();
	});

	it('renders error message when listPath is not passed in', async () => {
		const listProps = {
			data: [{ name: 'apple' }],
			isShoppingListLoading: false,
			listPath: '',
			listName: 'test-list',
		};
		renderList(listProps);

		const addItemForm = screen.queryByTestId('addItemForm-header');
		const shareForm = screen.queryByTestId('shareForm-header');
		const errorMessage = screen.getByTestId('noListErrorMsg');

		expect(errorMessage).toBeInTheDocument();
		expect(addItemForm).not.toBeInTheDocument();
		expect(shareForm).not.toBeInTheDocument();
	});

	it('renders error message when items are not passed in', async () => {
		const listProps = {
			data: [],
			isShoppingListLoading: false,
			listPath: '/test-list',
			listName: 'test-list',
		};
		renderList(listProps);
		const errorMessage = screen.getByTestId('noItemsErrorMsg');

		expect(errorMessage).toBeInTheDocument();
	});
});
