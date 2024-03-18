import { render, screen } from '@testing-library/react';
import { ManageList } from '../../../src/views/ManageList';
import { vi } from 'vitest';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../../../src/App';

describe('ManageList', () => {
	afterEach(() => {
		vi.resetAllMocks();
		vi.clearAllMocks();
	});

	const renderManageList = ({ listPath, data }) => {
		return render(
			<QueryClientProvider client={queryClient}>
				<ManageList listPath={listPath} data={data} />
			</QueryClientProvider>,
		);
	};

	it('renders AddItemForm and ShareForm if listPath is passed in', async () => {
		const data = { data: [{ name: 'apple' }], loading: false };
		renderManageList({ listPath: '/test-list', data });

		const addItemForm = screen.queryByTestId('addItemForm-header');
		const shareForm = screen.queryByTestId('shareForm-header');
		expect(addItemForm).toBeInTheDocument();
		expect(shareForm).toBeInTheDocument();

		const noListPathMessage = screen.queryByTestId('no-listpath-span');
		expect(noListPathMessage).toBeFalsy();
	});
	it('does not render AddItemForm and ShareForm if listPath is not passed in', async () => {
		renderManageList({});

		const addItemForm = screen.queryByTestId('addItemForm-header');
		const shareForm = screen.queryByTestId('shareForm-header');
		expect(addItemForm).not.toBeInTheDocument();
		expect(shareForm).not.toBeInTheDocument();

		const noListPathMessage = screen.queryByTestId('no-listpath-span');
		expect(noListPathMessage).toBeTruthy();
	});
});
