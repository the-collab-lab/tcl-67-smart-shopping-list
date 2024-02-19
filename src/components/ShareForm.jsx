import React, { useState } from 'react';
import { shareList } from '../api/firebase';
import { auth } from '../api/config';

const ShareForm = ({ listPath }) => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email) {
			try {
				const response = await shareList(listPath, auth.currentUser.uid, email);

				if (response.status === true) {
					setMessage(response.reason);
				} else {
					setMessage(response.reason);
				}
			} catch (error) {
				console.error(error.message);
			}
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email: </label>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						id="email"
						value={email}
					/>
				</div>
				<span>Enter the email of an existing user...</span> <br />
				<div>
					<button>Submit</button>
				</div>
				<div>
					<span>{message}</span>
				</div>
			</form>
		</div>
	);
};

export default ShareForm;
