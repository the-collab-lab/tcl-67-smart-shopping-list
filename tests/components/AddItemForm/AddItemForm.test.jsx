import { render, screen } from '@testing-library/react';
import AddItemForm from '../../../src/components/AddItemForm';
import * as FirebaseFunctions from '../../../src/api/firebase';
import { vi } from 'vitest';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../../../src/App';
import userEvent from '@testing-library/user-event';
import { sleep } from '../../testHelpers';

describe('AddItemForm', () => {
	afterEach(() => {
		vi.resetAllMocks();
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
		const data = { data: [{ name: 'apple' }], loading: false };
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

		const data = { data: [{ name: 'apple' }], loading: false };

		const mockedAddItem = vi.spyOn(FirebaseFunctions, 'addItem');
		mockedAddItem.mockImplementationOnce(async () => {
			await sleep();
			return mockedReturnValue;
		});

		renderAddItemForm({ listPath: '/test-list', data });

		const itemInput = screen.getByTestId('itemName');
		const submitButton = screen.getByTestId('submit-button');

		// Use userEvent for a more natural user interaction
		await userEvent.type(itemInput, 'Hello, World!');
		await userEvent.click(submitButton);

		const loading = await screen.findByTestId('addItemFormLoading');
		expect(loading).toBeTruthy();

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
		const data = { data: [{ name: 'apple' }], loading: false };

		const mockedAddItem = vi.spyOn(FirebaseFunctions, 'addItem');

		mockedAddItem.mockImplementationOnce(async () => {
			await sleep();
			throw new Error('test');
		});

		renderAddItemForm({ listPath: '/test-list', data });

		const itemInput = screen.getByTestId('itemName');
		const submitButton = screen.getByTestId('submit-button');

		// Use userEvent for a more natural user interaction
		await userEvent.type(itemInput, 'Hello, World!');
		await userEvent.click(submitButton);

		const loading = await screen.findByTestId('addItemFormLoading');
		expect(loading).toBeTruthy();

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
		const data = { data: [{ name: 'apple' }], loading: false };

		const mockedAddItem = vi.spyOn(FirebaseFunctions, 'addItem');

		renderAddItemForm({ listPath: '/test-list', data });

		const itemInput = screen.getByTestId('itemName');
		const submitButton = screen.getByTestId('submit-button');

		// Use userEvent for a more natural user interaction
		await userEvent.type(itemInput, 'apple');
		await userEvent.click(submitButton);

		const validationErrorMessage =
			await screen.findByTestId('addItemFormMessage');
		const errorMessage = screen.queryByTestId('addItemFormError');
		const successMessage = screen.queryByTestId('addItemFormSuccess');

		expect(validationErrorMessage.innerHTML).toBe('Item already exists');
		expect(errorMessage).toBeFalsy();
		expect(successMessage).toBeFalsy();

		expect(mockedAddItem).toHaveBeenCalledTimes(0);
	});
	it('Tries to add empty string but gets error', async () => {
		const data = { data: [{ name: 'apple' }], loading: false };

		const mockedAddItem = vi.spyOn(FirebaseFunctions, 'addItem');

		renderAddItemForm({ listPath: '/test-list', data });

		const submitButton = screen.getByTestId('submit-button');

		// Use userEvent for a more natural user interaction

		await userEvent.click(submitButton);

		const validationErrorMessage = screen.queryByTestId('addItemFormMessage');
		const errorMessage = screen.queryByTestId('addItemFormError');
		const successMessage = screen.queryByTestId('addItemFormSuccess');

		expect(validationErrorMessage.innerHTML).toBe(
			'Please enter a name for your item',
		);
		expect(errorMessage).toBeFalsy();
		expect(successMessage).toBeFalsy();

		expect(mockedAddItem).toHaveBeenCalledTimes(0);
	});
});
