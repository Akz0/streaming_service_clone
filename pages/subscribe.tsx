import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import { useRouter } from 'next/router';
import Loader from '../components/Loader';
import Plans from '../components/Plans';
import useAuth from '../hooks/useAuth';
import useSubsciption from '../hooks/useSubsciption';
import Payments from '../lib/stripe';

interface Props {
	products: Product[];
}
function Subscribe({ products }: Props) {
	const { user } = useAuth();
	const subscriptions = useSubsciption(user);
	const router = useRouter();

	if (subscriptions === null) {
		return (
			<div className="flex h-[50vh] w-full items-center justify-center">
				<Loader color="fill-white" />
			</div>
		);
	}
	if (!subscriptions) {
		return <Plans products={products} />;
	}
	if (subscriptions) {
		router.push('/home');
	}
}

export default Subscribe;

export const getServerSideProps = async () => {
	const products = await getProducts(Payments, {
		includePrices: true,
		activeOnly: true,
	})
		.then((response) => response)
		.catch((error) => console.log(error.message));

	return {
		props: {
			products,
		},
	};
};
