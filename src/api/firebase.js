import {
	arrayUnion,
	getDoc,
	setDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	addDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import {
	getFutureDate,
	getDaysBetweenDates,
	categorizePurchaseStatus,
} from '../utils/dates.js';
/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(userId, userEmail) {
	// Start with an empty array for our data.
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;
				const newData = listRefs.map((listRef) => {
					// We keep the list's id and path so we can use them later.
					return { name: listRef.id, path: listRef.path };
				});
				setData(newData);
			}
		});
	}, [userId, userEmail]);

	return data;
}

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listPath
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!listPath) return;

		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return data;
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 */
export async function createList(userId, userEmail, listName) {
	const listDocRef = doc(db, userId, listName);

	await setDoc(listDocRef, {
		owner: userId,
	});

	const userDocumentRef = doc(db, 'users', userEmail);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocRef),
	});
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */
export async function shareList(listPath, currentUserId, recipientEmail) {
	// Check if current user is owner.
	if (!listPath.includes(currentUserId)) {
		throw new Error("Current user isn't the owner of this list!");
	}
	// Get the document for the recipient user.
	const usersCollectionRef = collection(db, 'users');
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));
	// If the recipient user doesn't exist, we can't share the list.
	if (!recipientDoc.exists()) {
		throw new Error('User does not exist!');
	}

	// Add the list to the recipient user's sharedLists array.
	const listDocumentRef = doc(db, listPath);
	const userDocumentRef = doc(db, 'users', recipientEmail);
	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocumentRef),
	});

	return 'List was shared successfully!';
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listPath, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listPath, 'items');

	const docRef = await addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});

	// Retrieve the added document by its reference
	const addedDoc = await getDoc(docRef);

	// Return the document data
	return {
		id: docRef.id,
		...addedDoc.data(),
	};
}

export async function updateItem(
	listPath,
	{ itemId, dateNextPurchased, totalPurchases },
) {
	const itemDoc = doc(db, listPath, 'items', itemId);

	updateDoc(itemDoc, {
		dateLastPurchased: new Date(),
		dateNextPurchased,
		totalPurchases: totalPurchases + 1,
	});
	return 'Item purchased!';
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

// export function comparePurchaseUrgency(data) {
// 	let priority = {
// 		'soon': 1,
// 		'kindOf': 2,
// 		'notSoon': 3,
// 		'inactive': 4,
// 	};
// }

/* 
A function that defines the sort order. The return value should be a number whose sign indicates the relative order of the two elements: 
negative if a is less than b, positive if a is greater than b, and zero if they are equal. NaN is treated as 0. The function is called 
with the following arguments*/

// const urgency = categorizePurchaseStatus(numberOfDays);
// data.map((item) => {
// const numOfDays = getDaysBetweenDates(new Date(), item.dateNextPurchased);
// }
export function testFn() {
	const items = [
		{
			dateCreated: 'February 9, 2024 at 1:05:32 PM UTC-6',
			dateLastPurchased: null,
			dateNextPurchased: 'March 27, 2024 at 2:05:32 PM UTC-5',
			name: 'pear',
			totalPurchases: 0,
		},
		{
			dateCreated: 'February 16, 2024 at 1:05:32 PM UTC-6',
			dateLastPurchased: null,
			dateNextPurchased: 'March 17, 2024 at 2:05:32 PM UTC-5',
			name: 'apple',
			totalPurchases: 0,
		},
	];
	items.sort((a, b) => {
		const numOfDaysA = getDaysBetweenDates(a.dateCreated, a.dateNextPurchased);
		const numOfDaysB = getDaysBetweenDates(b.dateCreated, b.dateNextPurchased);
		console.log(numOfDaysA);
		console.log(numOfDaysB);
		if (numOfDaysA < numOfDaysB) {
			console.log(items);
			return -1;
		}
		if (numOfDaysA > numOfDaysB) {
			console.log(items);
			return 1;
		}

		// names must be equal
		return 0;
	});

	console.log(items);
}

// export function comparePurchaseUrgency(data) {
// 	//
// 	)};

// PSEUDO CODE:
// loop through list items
// place items into arrays, depending on the urgency
// use daysBetweenDates() to sort in ascending order of days
// sort items w same days alphabetically
// if inactive, last
// once each array is sorted, append to respective div

// dont need to add urgency property, calculate on demand
// category display function
// find and insert into sublist
// separate data modification from view update
// if you modify array page re-renders
// comparator function to compare 2 items
// sort uses -1, 0, 1 to determine order
// write a function that takes in one item and mutates the item's array to put it in the right order
// use badges to define urgency
