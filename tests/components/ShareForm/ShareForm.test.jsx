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

	//spy: partial mock - only specific methods of object are overridden
	// mock: whole thing is overridden

	// 1. test that component renders what is expected
	// 2. when calling firebase function, expected thing happens

	//facade pattern?
	// e.g. integation test for firebase, before each test, mockout useAuth
	// business logic - utils should be unit tested
	// smoke tests for component rendering - rendering with errors
	// it('Shares form with user successfully', async () => {
	// 	//mocked user
	// 	const mockedUserReturnValue = {
	// 		uid: 'testuser',
	// 		email: 'test@gmail.com',
	// 	};
	// 	const mockedUser = vi.spyOn(AuthFunctions, 'useAuth');
	// 	mockedUser.mockImplementationOnce(async () => {
	// 		await sleep();
	// 		return mockedUserReturnValue;
	// 	});

	// 	// mocked share list
	// 	const mockedShareListReturnValue = 'List was shared successfully';
	// 	const mockedShareList = vi.spyOn(FirebaseFunctions, 'shareList');
	// 	mockedShareList.mockImplementationOnce(async () => {
	// 		await sleep();
	// 		return mockedShareListReturnValue;
	// 	});

	// 	renderShareListForm({ listPath: '/test-list' });

	// 	// submitting email address
	// 	const emailInput = screen.getByTestId('email');
	// 	const submitButton = screen.getByTestId('shareForm-submit-button');
	// 	await userEvent.type(emailInput, 'email@email.com');
	// 	await userEvent.click(submitButton);

	// 	// expect(mockedShareList).toHaveBeenCalledWith(mockedUserReturnValue);
	// 	const successMessage = await screen.findByTestId('shareFormMessage');
	// 	expect(successMessage).toBeTruthy();
	// 	expect(successMessage.innerHTML).toBe('List was shared successfully!');
	// });
	// it('Tries to add empty string in email input', async () => {
	// 	const mockedReturnValue = 'List was shared successfully';
	// 	const mockedShareList = vi.spyOn(FirebaseFunctions, 'shareList');
	// 	mockedShareList.mockImplementationOnce(async () => {
	// 		await sleep();
	// 		return mockedReturnValue;
	// 	});
	// 	renderShareListForm({ listPath: '/test-list' });

	// 	const submitButton = screen.getByTestId('shareForm-submit-button');
	// 	await userEvent.click(submitButton);
	// 	const validationMessage = await screen.findByTestId('shareFormMessage');

	// 	expect(validationMessage).toBeTruthy();
	// 	expect(validationMessage.innerHTML).toBe('Please enter an email');
	// });
});
