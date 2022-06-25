import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FireDB } from '../firebase';
import { WishListCollection } from '../utils/constants';
import { Movie } from '../utils/types';

function useWishList(uid: string | undefined) {
	const [wishlist, setWishlist] = useState<Movie[] | DocumentData[]>([]);
	useEffect(() => {
		if (!uid) return;

		return onSnapshot(
			collection(FireDB, 'customers', uid, WishListCollection),
			(snapshot) => {
				setWishlist(
					snapshot.docs.map((doc) => {
						return {
							id: doc.id,
							...doc.data,
						};
					})
				);
			}
		);
	}, [FireDB, uid]);

	return wishlist;
}

export default useWishList;
