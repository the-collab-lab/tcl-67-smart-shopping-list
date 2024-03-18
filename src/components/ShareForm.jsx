import React, { useState } from 'react';
import { shareList } from '../api/firebase';
import { useAuth } from '../api';
import { useMutation } from 'react-query';

async function shareListWithUser({ listPath, user, email }) {
	return await shareList(listPath, user.uid, email);
}

const ShareForm = ({ listPath }) => {
	const { user } = useAuth();
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const {
		isSuccess,
		error,
		isLoading,
		reset,
		mutateAsync: shareListWithUserMutation,
	} = useMutation({
		mutationFn: shareListWithUser,
	});

	// async function shareListWithUser() {
	// 	console.log(listPath, user.uid, email);
	// 	return await shareList(listPath, user.uid, email);
	// }

	const handleSubmit = async (e) => {
		reset();
		e.preventDefault();
		if (!email.trim()) {
			setMessage('Please enter an email');
			return;
		}
		console.log(shareListWithUserMutation);

		await shareListWithUserMutation({ listPath, user, email }).catch((e) =>
			console.error(e),
		);
	};
	return (
		<div>
			<h2 data-testid="shareForm-header">Share your list</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email: </label>
					<input
						data-testid="shareForm-email-input"
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						id="email"
						value={email}
					/>
				</div>
				<span>Enter the email of an existing user...</span> <br />
				<div>
					<button data-testid="shareForm-submit-button">Submit</button>
				</div>
				<span data-testid="shareForm-validation-message">{message}</span>
				{isSuccess && (
					<span data-testid="shareForm-success-message">
						Successfully shared item with user
					</span>
				)}
				{error && <span>Unable to share item with user</span>}
				{isLoading && <span>Sharing...</span>}
			</form>
		</div>
	);
};

export default ShareForm;
