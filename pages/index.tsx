import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Plans from '../components/Plans';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import useSubsciption from '../hooks/useSubsciption';
import Payments from '../lib/stripe';
import requests from '../utils/requests';
import { Movie } from '../utils/types';

interface Props {
	netflixOriginals: Movie[];
	trendingNow: Movie[];
	topRated: Movie[];
	actionMovies: Movie[];
	comedyMovies: Movie[];
	horrorMovies: Movie[];
	romanceMovies: Movie[];
	documentaries: Movie[];
	products: Product[];
}
const Home = ({
	netflixOriginals,
	actionMovies,
	comedyMovies,
	documentaries,
	horrorMovies,
	romanceMovies,
	topRated,
	trendingNow,
	products,
}: Props) => {
	const { SignOut, loading, user } = useAuth();
	const showModal = useRecoilValue(modalState);
	const subscriptions = useSubsciption(user);

	if (loading || subscriptions === null) {
		return (
			<div className="flex h-[50vh] w-full items-center justify-center">
				<Loader color="fill-white" />
			</div>
		);
	}

	if (!subscriptions) {
		return <Plans products={products} />;
	}

	return (
		<div className="lg:h-140vh relative h-screen bg-gradient-to-b to-[#010511]">
			<Head>
				<title>NETFLIX</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
				<Banner netflixOriginals={netflixOriginals} />
				<section className="md:space-y-24">
					<Row title="Trending Now" movies={trendingNow} />
					<Row title="Top Rated Movies" movies={topRated} />
					<Row title="Action" movies={actionMovies} />
					<Row title="Comedy" movies={comedyMovies} />
					<Row title="Romance" movies={romanceMovies} />
					<Row title="Horror" movies={horrorMovies} />
					<Row title="Documentaries" movies={documentaries} />
				</section>
				{/* Modal */}
				<Modal />
			</main>
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const products = await getProducts(Payments, {
		includePrices: true,
		activeOnly: true,
	})
		.then((response) => response)
		.catch((error) => console.log(error.message));

	const [
		netflixOriginals,
		trendingNow,
		topRated,
		actionMovies,
		comedyMovies,
		horrorMovies,
		romanceMovies,
		documentaries,
	] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchTrending).then((res) => res.json()),
		fetch(requests.fetchTopRated).then((res) => res.json()),
		fetch(requests.fetchActionMovies).then((res) => res.json()),
		fetch(requests.fetchComedyMovies).then((res) => res.json()),
		fetch(requests.fetchHorrorMovies).then((res) => res.json()),
		fetch(requests.fetchRomanceMovies).then((res) => res.json()),
		fetch(requests.fetchDocumentaries).then((res) => res.json()),
	]);

	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			trendingNow: trendingNow.results,
			topRated: topRated.results,
			actionMovies: actionMovies.results,
			comedyMovies: comedyMovies.results,
			horrorMovies: horrorMovies.results,
			romanceMovies: romanceMovies.results,
			documentaries: documentaries.results,
			products,
		},
	};
};
