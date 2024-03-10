import React, { useState } from 'react';
import { shareList } from '../api/firebase';
import { useAuth } from '../api';

const ShareForm = ({ listPath }) => {
	const { user } = useAuth();
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email.trim()) {
			setMessage('Please enter an email');
		} else {
			try {
				const response = await shareList(listPath, user.uid, email);
				setMessage(response);
			} catch (error) {
				console.error(error.message);
				setMessage(error.message);
			}
		}
	};
	return (
		<div>
			<h2 data-testid="shareForm-header">Share your list</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email: </label>
					<input
						data-testid="email"
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
				<div>
					<span data-testid="shareFormMessage">{message}</span>
				</div>
			</form>
		</div>
	);
};

export default ShareForm;
