import { addItem } from '../api/firebase';
import { useState, useMemo } from 'react';
import { useMutation } from 'react-query';
import { normalizeInput } from '../utils';

async function addItemToList({ listPath, userItem, itemDuration }) {
	return await addItem(listPath, {
		itemName: userItem,
		daysUntilNextPurchase: itemDuration,
	});
}

export default function AddItemForm({ listPath, data }) {
	const [message, setMessage] = useState('');
	const [userItem, setUserItem] = useState('');
	const [itemDuration, setItemDuration] = useState(7);
	const [addItemToggle, setAddItemToggle] = useState('+');

	const normalizedItemNames = useMemo(() => {
		return data?.map((item) => normalizeInput(item.name));
	}, [data]);

	const {
		isSuccess,
		error,
		isLoading,
		reset,
		mutateAsync: addItemToListMutation,
	} = useMutation({
		mutationFn: addItemToList,
	});

	const handleSubmit = async (e) => {
		reset();
		e.preventDefault();
		setUserItem('');
		setMessage('');
		if (!userItem.trim()) {
			setMessage('Please enter a name for your item');
			return;
		}

		const normalizedInput = normalizeInput(userItem);

		if (normalizedItemNames?.includes(normalizedInput)) {
			setMessage('Item already exists');
			return;
		}

		await addItemToListMutation({ listPath, userItem, itemDuration }).catch(
			(e) => console.error(e),
		);
	};

	const handleSelection = async (e) => {
		e.preventDefault();
		setItemDuration(Number(e.target.value));
	};

	function handleAddItemToggle(e) {
		e.preventDefault();
		addItemToggle === '+' ? setAddItemToggle('-') : setAddItemToggle('+');
	}

	return (
		<section className="addItemSection">
			<header className="addItemHeader">
				<button
					className={(addItemToggle, 'addItemButton')}
					onClick={(e) => handleAddItemToggle(e)}
				>
					{addItemToggle}
				</button>
				<h2 data-testid="addItemForm-header">Add Item</h2>
			</header>
			<form
				className={
					(addItemToggle === '+' ? 'addItemMinimized' : 'addItemMaximized') +
					' addItemForm'
				}
				onSubmit={handleSubmit}
			>
				<div>
					<label htmlFor="itemName">Item Name: </label>
					<div>
						<input
							data-testid="itemName"
							onChange={(e) => setUserItem(e.target.value)}
							type="text"
							id="itemName"
							value={userItem}
						/>
					</div>
				</div>
				<h4>When would you like a reminder to buy this item?</h4>
				<div className="addItemButtonGroup">
					<button
						value={7}
						onClick={(e) => handleSelection(e)}
						data-testid="replaceTime"
					>
						7 Days
					</button>
					<button value={14} onClick={(e) => handleSelection(e)}>
						14 Days
					</button>
					<button value={30} onClick={(e) => handleSelection(e)}>
						30 Days
					</button>
				</div>
				<div>
					<button className="submitButton" data-testid="submit-button">
						Add Item
					</button>
				</div>
				<div>
					<h6 data-testid="addItemFormMessage">{message}</h6>
					{isSuccess && <h6 data-testid="addItemFormSuccess">Success!!</h6>}
					{error && (
						<h6 data-testid="addItemFormError">Unable to add item to list</h6>
					)}
					{isLoading && <h6 data-testid="addItemFormLoading">Adding...</h6>}
				</div>
			</form>
		</section>
	);
}
