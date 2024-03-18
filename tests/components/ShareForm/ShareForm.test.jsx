import { render, screen } from '@testing-library/react';
import ShareForm from '../../../src/components/ShareForm';
import * as FirebaseFunctions from '../../../src/api/firebase';
import { vi } from 'vitest';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../../../src/App';
import userEvent from '@testing-library/user-event';
import * as AuthFunctions from '../../../src/api';
import { sleep } from '../../testHelpers';

describe('ShareForm', () => {
	afterEach(() => {
		vi.resetAllMocks();
		vi.clearAllMocks();
	});

	const renderShareListForm = ({ listPath }) => {
		return render(
			<QueryClientProvider client={queryClient}>
				<ShareForm listPath={listPath} />
			</QueryClientProvider>,
		);
	};

	it('renders ShareForm', () => {
		renderShareListForm({ listPath: '/test-list' });
	});

	it('Shares form with user successfully', async () => {
		//mocked user
		const mockedUserReturnValue = {
			user: {
				uid: 'testuser',
			},
		};
		const mockedUser = vi.spyOn(AuthFunctions, 'useAuth');
		mockedUser.mockImplementation(() => {
			return mockedUserReturnValue;
		});

		// mocked ShareList
		const mockedShareListReturnValue = 'List was shared successfully';
		const mockedShareList = vi.spyOn(FirebaseFunctions, 'shareList');
		mockedShareList.mockImplementationOnce(async () => {
			await sleep();
			return mockedShareListReturnValue;
		});

		renderShareListForm({ listPath: '/test-list' });

		// submitting email address
		const emailInput = screen.getByTestId('shareForm-email-input');
		const submitButton = screen.getByTestId('shareForm-submit-button');
		await userEvent.type(emailInput, 'email@email.com');
		await userEvent.click(submitButton);

		expect(mockedShareList).toHaveBeenCalledTimes(1);
		expect(mockedShareList).toHaveBeenCalledWith(
			'/test-list',
			'testuser',
			'email@email.com',
		);
		const successMessage = await screen.findByTestId(
			'shareForm-success-message',
		);
		expect(successMessage).toBeTruthy();
		expect(successMessage.innerHTML).toBe('Successfully shared item with user');
	});
	it('Tries to add empty string in email input', async () => {
		//mocked user
		const mockedUserReturnValue = {
			user: {
				uid: 'testuser',
			},
		};
		const mockedUser = vi.spyOn(AuthFunctions, 'useAuth');
		mockedUser.mockImplementation(() => {
			return mockedUserReturnValue;
		});

		// mocked ShareList
		const mockedReturnValue = 'List was shared successfully';
		const mockedShareList = vi.spyOn(FirebaseFunctions, 'shareList');
		mockedShareList.mockImplementationOnce(async () => {
			await sleep();
			return mockedReturnValue;
		});

		renderShareListForm({ listPath: '/test-list' });

		const submitButton = screen.getByTestId('shareForm-submit-button');
		await userEvent.click(submitButton);

		const successMessage = await screen.findByTestId(
			'shareForm-validation-message',
		);
		expect(successMessage).toBeTruthy();
		expect(successMessage.innerHTML).toBe('Please enter an email');
	});
});
