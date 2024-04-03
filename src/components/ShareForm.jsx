import React, { useState } from 'react';
import { shareList } from '../api/firebase';
import { useAuth } from '../api';
import { useMutation } from 'react-query';
import Button from './Button';

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
		<section className="sideBySide-section shareForm">
			<div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">
							Enter the email of another existing user
						</label>
						<input
							data-testid="shareForm-email-input"
							onChange={(e) => setEmail(e.target.value)}
							type="text"
							id="email"
							value={email}
						/>
					</div>

					<div>
						<Button
							text="Send List"
							color="#89D2FF"
							testId="shareForm-submit-button"
						/>
					</div>
					<h6 data-testid="shareForm-validation-message">{message}</h6>
					{isSuccess && (
						<h6 data-testid="shareForm-success-message">
							Successfully shared item with user
						</h6>
					)}
					{error && <h6>Unable to share item with user</h6>}
					{isLoading && <h6>Sharing...</h6>}
				</form>
			</div>

			<div>
				<h2 data-testid="shareForm-header">Share your list with a Collabie!</h2>
			</div>
		</section>
	);
};

export default ShareForm;
