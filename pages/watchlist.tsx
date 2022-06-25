import Head from 'next/head';
import Header from '../components/Header';
import Modal from '../components/Modal';

function Watchlist() {
	return (
		<div className="lg:h-140vh relative h-screen border ">
			<Head>
				<title>NETFLIX : Your Watchlist</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
				<Modal />
			</main>
		</div>
	);
}

export default Watchlist;
