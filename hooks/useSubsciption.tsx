import {
	onCurrentUserSubscriptionUpdate,
	Subscription,
} from '@stripe/firestore-stripe-payments';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Payments from '../lib/stripe';

function useSubsciption(user: User | null) {
	const [subscription, setSubscription] = useState<Subscription | null>(null);

	useEffect(() => {
		if (!user) return;

		onCurrentUserSubscriptionUpdate(Payments, (snapshot) => {
			setSubscription(
				snapshot?.subscriptions.filter(
					(sub) => sub.status === 'active' || sub.status === 'trialing'
				)[0]
			);
		});
	}, [user]);
	return subscription;
}

export default useSubsciption;
