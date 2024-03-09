import { render, screen } from '@testing-library/react';
import AddItemForm from '../../../src/components/AddItemForm';
import * as FirebaseFunctions from '../../../src/api/firebase';
import { vi } from 'vitest';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../../../src/App';
import userEvent from '@testing-library/user-event';

// test-levels
// e2e - QA / Prod

// mock api calls here
// local tests
//   integration
//   unit

describe('AddItemForm', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const renderAddItemForm = ({ listPath, data }) => {
		return render(
			<QueryClientProvider client={queryClient}>
				<AddItemForm listPath={listPath} data={data} />
			</QueryClientProvider>,
		);
	};

	it('renders AddItemForm', () => {
		const data = [{ name: 'apple' }];
		renderAddItemForm({ listPath: '/test', data });
	});

	it('Adds Item successfully', async () => {
		const mockedReturnValue = {
			id: 'peB0AN2G4HrERSRDKGhA',
			dateCreated: new Date(),
			dateLastPurchased: null,
			dateNextPurchased: new Date(),
			name: 'lemon1',
			totalPurchases: 0,
		};

		const data = [{ name: 'apple' }];

		// Mock the implementation of FirebaseFunctions.addItem
		const mockedAddItem = vi.spyOn(FirebaseFunctions, 'addItem');
		mockedAddItem.mockReturnValue(mockedReturnValue);

		renderAddItemForm({ listPath: '/test-list', data });

		const itemInput = screen.getByTestId('itemName');
		const submitButton = screen.getByTestId('submit-button');

		// Use userEvent for a more natural user interaction
		await userEvent.type(itemInput, 'Hello, World!');
		await userEvent.click(submitButton);

		// addItemFormMessage

		// addItemFormSuccess

		// addItemFormLoading

		// const loading = await screen.findByTestId('addItemFormLoading');

		// expect(loading).toBeTruthy();

		const successMessage = await screen.findByTestId('addItemFormSuccess');
		const errorMessage = screen.queryByTestId('addItemFormError');

		expect(errorMessage).toBeFalsy();
		expect(successMessage).toBeTruthy();
		expect(mockedAddItem).toHaveBeenCalledWith('/test-list', {
			itemName: 'Hello, World!',
			daysUntilNextPurchase: 7,
		});
	});

	it('Adds item but get an error', async () => {
		const mockedReturnValue = {
			id: 'peB0AN2G4HrERSRDKGhA',
			dateCreated: new Date(),
			dateLastPurchased: null,
			dateNextPurchased: new Date(),
			name: 'lemon1',
			totalPurchases: 0,
		};

		const data = [{ name: 'apple' }];

		// Mock the implementation of FirebaseFunctions.addItem
		const mockedAddItem = vi.spyOn(FirebaseFunctions, 'addItem');
		mockedAddItem.mockImplementation(() => {
			throw new Error();
		});
		// mockedAddItem.mockReturnValue(mockedReturnValue);

		renderAddItemForm({ listPath: '/test-list', data });

		const itemInput = screen.getByTestId('itemName');
		const submitButton = screen.getByTestId('submit-button');

		// Use userEvent for a more natural user interaction
		await userEvent.type(itemInput, 'Hello, World!');
		await userEvent.click(submitButton);

		// addItemFormMessage

		// addItemFormSuccess

		// addItemFormLoading

		// const loading = await screen.findByTestId('addItemFormLoading');

		// expect(loading).toBeTruthy();

		const errorMessage = await screen.findByTestId('addItemFormError');
		const successMessage = screen.queryByTestId('addItemFormSuccess');

		expect(errorMessage).toBeTruthy();
		expect(successMessage).toBeFalsy();

		expect(mockedAddItem).toHaveBeenCalledWith('/test-list', {
			itemName: 'Hello, World!',
			daysUntilNextPurchase: 7,
		});
	});

	it('Tries to add duplicate item but gets error', async () => {
		const mockedReturnValue = {
			id: 'peB0AN2G4HrERSRDKGhA',
			dateCreated: new Date(),
			dateLastPurchased: null,
			dateNextPurchased: new Date(),
			name: 'lemon1',
			totalPurchases: 0,
		};

		const data = [{ name: 'apple' }];

		// Mock the implementation of FirebaseFunctions.addItem
		const mockedAddItem = vi.spyOn(FirebaseFunctions, 'addItem');
		mockedAddItem.mockImplementation(() => {
			throw new Error();
		});
		// mockedAddItem.mockReturnValue(mockedReturnValue);

		renderAddItemForm({ listPath: '/test-list', data });

		const itemInput = screen.getByTestId('itemName');
		const submitButton = screen.getByTestId('submit-button');

		// Use userEvent for a more natural user interaction
		await userEvent.type(itemInput, 'Hello, World!');
		await userEvent.click(submitButton);

		// addItemFormMessage

		// addItemFormSuccess

		// addItemFormLoading

		// const loading = await screen.findByTestId('addItemFormLoading');

		// expect(loading).toBeTruthy();

		const errorMessage = await screen.findByTestId('addItemFormError');
		const successMessage = screen.queryByTestId('addItemFormSuccess');

		expect(errorMessage).toBeTruthy();
		expect(successMessage).toBeFalsy();

		expect(mockedAddItem).toHaveBeenCalledWith('/test-list', {
			itemName: 'Hello, World!',
			daysUntilNextPurchase: 7,
		});
	});
});
