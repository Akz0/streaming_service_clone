import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import BasicMenu from './BasicMenu';

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const { SignOut } = useAuth();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header className={`${isScrolled && `bg-[#141414]`} z-50`}>
			<div className="flex items-center space-x-2 md:space-x-10">
				<img
					src="https://rb.gy/ulxxee"
					width={100}
					height={100}
					className="cursor-pointer object-contain"
				/>

				<BasicMenu />

				<ul className="hidden space-x-4 md:flex">
					<Link href="/">
						<li className="headerLink">Home</li>
					</Link>

					<Link href="/">
						<li className="headerLink">TV Shows</li>
					</Link>

					<Link href="/">
						<li className="headerLink">Movies</li>
					</Link>

					<Link href="/">
						<li className="headerLink">New & Popular</li>
					</Link>

					<Link href="/watchlist">
						<li className="headerLink">Watchlist</li>
					</Link>
				</ul>
			</div>

			<div className="flex items-center space-x-4 text-sm font-light">
				<SearchIcon className="hidden h-6 w-6 sm:inline" />
				<p className="hidden lg:inline">Kids</p>
				<BellIcon className="h-6 w-6" />
				<Link href={'/profile'}>
					<img
						src="https://rb.gy/g1pwyx"
						alt=""
						className="cursor-pointer rounded"
					/>
				</Link>
			</div>
		</header>
	);
}

export default Header
