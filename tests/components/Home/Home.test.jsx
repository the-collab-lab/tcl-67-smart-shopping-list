import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../../../src/App';
import { Home } from '../../../src/views/Home';

describe('Home', () => {
	const renderHome = ({
		data,
		areListsLoading,
		setListPath,
		listPath,
		listName,
	}) => {
		return render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<Home
						data={data}
						areListsLoading={areListsLoading}
						setListPath={setListPath}
						listPath={listPath}
						listName={listName}
					/>
				</MemoryRouter>
			</QueryClientProvider>,
		);
	};

	it('renders Home', async () => {
		const data = [{ name: 'apple' }];
		renderHome({
			data,
			areListsLoading: false,
			setListPath: () => {},
			listPath: '',
			listName: '',
		});
	});

	it('renders AddListForm and SelectListForm', async () => {
		const data = [{ name: 'apple' }];
		renderHome({
			data,
			areListsLoading: false,
			setListPath: () => {},
			listPath: '',
			listName: '',
		});

		const addListForm = screen.getByTestId('addListForm');
		const selectListForm = screen.getByTestId('selectListForm');
		expect(addListForm).toBeInTheDocument();
		expect(selectListForm).toBeInTheDocument();
	});
});
