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

	const renderList = ({ listPath, data }) => {
		return render(
			<QueryClientProvider client={queryClient}>
				<List listPath={listPath} data={data} />
			</QueryClientProvider>,
		);
	};

	it('renders AddItemForm and ShareForm if listPath is passed in', async () => {
		const data = { data: [{ name: 'apple' }], loading: false };
		renderList({ listPath: '/test-list', data });

		const addItemForm = screen.queryByTestId('addItemForm-header');
		const shareForm = screen.queryByTestId('shareForm-header');
		expect(addItemForm).toBeInTheDocument();
		expect(shareForm).toBeInTheDocument();

		const noListPathMessage = screen.queryByTestId('no-listpath-span');
		expect(noListPathMessage).toBeFalsy();
	});

	it('renders error message when listPath is not passed in', async () => {
		const data = { data: [] };
		renderList({ listPath: '', data });

		const addItemForm = screen.queryByTestId('addItemForm-header');
		const shareForm = screen.queryByTestId('shareForm-header');
		const errorMessage = screen.getByTestId('noListErrorMsg');

		expect(errorMessage).toBeInTheDocument();
		expect(addItemForm).not.toBeInTheDocument();
		expect(shareForm).not.toBeInTheDocument();
	});

	it('renders error message when items are not passed in', async () => {
		const data = { data: [] };
		renderList({ listPath: '/test-list', data });
		const errorMessage = screen.getByTestId('noItemsErrorMsg');

		expect(errorMessage).toBeInTheDocument();
	});
});
