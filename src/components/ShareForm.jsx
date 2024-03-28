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

	const handleSubmit = async (e) => {
		reset();
		e.preventDefault();
		if (!email.trim()) {
			setMessage('Please enter an email');
			return;
		}

		await shareListWithUserMutation({ listPath, user, email }).catch((e) =>
			console.error(e),
		);
	};
	return (
		<>
			<div className="div1">
				<h2 data-testid="shareForm-header">Share your list with a Collabie!</h2>
				<span>Enter the email of another existing user.</span>
			</div>

			<div className="div2">
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

					<div>
						<button data-testid="shareForm-submit-button">Send List</button>
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
		</>
	);
};

export default ShareForm;
