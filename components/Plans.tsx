import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
import Table from './Table';

interface Props {
	products: Product[];
}
function Plans({ products }: Props) {
	const { SignOut, user } = useAuth();
	const [selectedPlan, setSelectedPlan] = useState<Product>(products[2]);
	const [isBillingLoading, setIsBillingLoading] = useState(true);

	const subscribeToPlan = () => {
		if (!user) {
			return;
		}
	};

	return (
		<div>
			<Head>
				<title>Netflix : Choose a Subscription</title>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</Head>

			<header className=" border-b border-white/10 bg-[#141414]">
				<Link href={'/'}>
					<img
						src="https://rb.gy/ulxxee"
						alt="Netflix"
						width={150}
						height={90}
						className="cursor-pointer object-contain"
					/>
				</Link>

				<button
					className="text-lg font-medium hover:underline"
					onClick={SignOut}
				>
					Sign Out
				</button>
			</header>

			<main className="mx-auto max-w-5xl px-5 pt-[10rem] pb-12 transition-all md:px-10">
				<h1 className="mb-3 text-3xl font-medium">
					Choose the plan that suits your needs
				</h1>
				<ul>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
						Ad-free.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
						just for you.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
						your plan anytime.
					</li>
				</ul>

				<div className="mt-4 flex flex-col space-y-4">
					<div className="flex w-full items-center justify-center self-end md:w-3/5">
						{/* Plan */}
						{products.map((product) => {
							return (
								<div
									onClick={(event) => {
										setSelectedPlan(product);
									}}
									key={product.id}
									className={`planBox cursor-pointer hover:opacity-100 ${
										selectedPlan.id === product.id
											? `opacity-100`
											: `opacity-60`
									}`}
								>
									{' '}
									{product.name}{' '}
								</div>
							);
						})}
					</div>

					<Table products={products} selectedPlan={selectedPlan} />
					<button
						disabled={!selectedPlan || isBillingLoading}
						className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
							isBillingLoading && 'opacity-60'
						}`}
						onClick={subscribeToPlan}
					>
						{isBillingLoading ? <Loader color="fill-white" /> : 'Subscribe'}
					</button>
				</div>
			</main>
		</div>
	);
}

export default Plans;
