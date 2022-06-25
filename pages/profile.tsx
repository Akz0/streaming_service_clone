import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Membership from '../components/Membership';
import useAuth from '../hooks/useAuth';
import useSubsciption from '../hooks/useSubsciption';
import Payments from '../lib/stripe';

interface Props {
	products: Product[];
}
function Profile({ products }: Props) {
	const { SignOut, loading, user } = useAuth();
	const subscriptions = useSubsciption(user);

	const memberSince = new Date(subscriptions?.created!)
		.toLocaleString()
		.split(' ')[0]
		.slice(0, 10);

	console.log(memberSince);
	return (
		<div>
			<Head>
				<title>Netflix Account Settings</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className={`bg-[#141414]`}>
				<Link href="/">
					<img
						src="https://rb.gy/ulxxee"
						width={120}
						height={120}
						className="cursor-pointer object-contain"
					/>
				</Link>
				<Link href="/profile">
					<img
						src="https://rb.gy/g1pwyx"
						alt=""
						className="cursor-pointer rounded"
					/>
				</Link>
			</header>

			<main
				className="mx-auto max-w-6xl px-5 pt-28 pb-12 transition-all 
            md:px-10"
			>
				<div className="flex flex-col gap-x-4 md:flex-row md:items-center">
					<h1 className="text-3xl md:text-4xl">Account</h1>
					<div className="flex flex-col gap-x-4 md:flex-row md:items-center">
						<img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
						<p className="text-xs font-semibold text-[#555]">
							Member Since {memberSince}
						</p>
					</div>
				</div>

				<Membership />

				<div
					className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4
                md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0"
				>
					<h4 className="">Plan Details</h4>

					<div className="col-span-2">
						{
							products.filter((product) => {
								return product.id === subscriptions?.product;
							})[0]?.name
						}
					</div>
					<p className="cursor-pointer text-blue-500 hover:underline md:text-right">
						{' '}
						Change Plan{' '}
					</p>
				</div>

				<div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
					<h4 className="text-lg text-[gray]">Settings</h4>
					<p
						className="col-span-3 cursor-pointer text-blue-500 hover:underline"
						onClick={SignOut}
					>
						Sign out of all devices
					</p>
				</div>
			</main>
		</div>
	);
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async () => {
	const products = await getProducts(Payments, {
		includePrices: true,
		activeOnly: true,
	})
		.then((response) => response)
		.catch((error) => console.error(error.message));

	return {
		props: {
			products,
		},
	};
};
