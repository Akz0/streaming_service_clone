import {
	createCheckoutSession,
	getStripePayments,
} from '@stripe/firestore-stripe-payments';
import { getFunctions, httpsCallable } from '@firebase/functions';
import FireApp, { FireAuth } from '../firebase';

const Payments = getStripePayments(FireApp, {
	customersCollection: 'customers',
	productsCollection: 'products',
});

const LoadCheckout = async (priceId: 'string') => {
	await createCheckoutSession(Payments, {
		price: priceId,
		success_url: window.location.origin,
		cancel_url: window.location.origin,
	})
		.then((snapshot) => window.location.assign(snapshot.url))
		.catch((error) => console.log(error.message));
};

export { LoadCheckout };
export default Payments;
