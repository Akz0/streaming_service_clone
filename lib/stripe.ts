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

const LoadCheckout = async (priceId: string) => {
	await createCheckoutSession(Payments, {
		price: priceId,
		success_url: window.location.origin,
		cancel_url: window.location.origin,
	})
		.then((snapshot) => window.location.assign(snapshot.url))
		.catch((error) => console.log(error.message));
};

const ManageMembership = async () => {
	const instance = getFunctions(FireApp, 'us-central1');
	const functionRef = httpsCallable(
		instance,
		'ext-firestore-stripe-payments-createPortalLink',
		{}
	);

	await functionRef({
		returnUrl: `${window.location.origin}/profile`,
	})
		.then(({ data }: any) => [window.location.assign(data.url)])
		.catch((errors) => console.error(errors.message));
};

export { LoadCheckout, ManageMembership };
export default Payments;
