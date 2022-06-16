import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie } from '../utils/types';

interface Props {
	movie: Movie;
}
function Thambnail({ movie }: Props) {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

	const imageURL = `https://image.tmdb.org/t/p/w500${
		movie?.backdrop_path || movie?.poster_path
	}`;

	return (
		<div
			className="relative h-28 min-w-[180px] cursor-pointer
        transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
			onClick={() => {
				setCurrentMovie(movie);
				setShowModal(true);
			}}
		>
			<Image
				src={imageURL}
				layout="fill"
				className="rounded-sm object-cover md:rounded"
			/>
		</div>
	);
}

export default Thambnail;
