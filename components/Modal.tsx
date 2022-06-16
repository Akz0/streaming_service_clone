import {
	PlusIcon,
	ThumbUpIcon,
	VolumeOffIcon,
	VolumeUpIcon,
	XIcon,
} from '@heroicons/react/solid';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Element, Genre } from '../utils/types';
function Modal() {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);
	const [muted, setMuted] = useState<boolean>(false);
	const [trailer, setTrailer] = useState<string>('');
	const [genres, setGenres] = useState<Genre[]>([]);
	const handleClose = () => {
		setShowModal(false);
	};

	useEffect(() => {
		console.log('Movie Changed', movie);
	}, [movie]);
	useEffect(() => {
		if (!movie) return;

		// console.log(
		// 	`Trailer Fetched with Movie - ${movie?.id} ${movie?.name || movie?.title}`
		// );
		async function fetchMovie() {
			const data = await fetch(
				`https://api.themoviedb.org/3/${
					movie?.media_type === 'tv' ? 'tv' : 'movie'
				}/${movie?.id}?api_key=${
					process.env.NEXT_PUBLIC_API_KEY
				}&language=en-US&append_to_response=videos`
			).then((response) => response.json());
			// console.log('Fetch Videos API Result', data);
			if (data?.videos) {
				const index = data.videos.results.findIndex((element: Element) => {
					return element.type === 'Trailer';
				});
				setTrailer(data.videos?.results[index]?.key);
			}

			if (data?.genres) {
				setGenres(data.genres);
			}
			// console.log(`Viewving Movie : ${data?.title || movie?.name}`, trailer);
		}
		fetchMovie();
	}, [movie]);

	return (
		<div>
			<MuiModal
				open={showModal}
				onClose={handleClose}
				className="fixed !top-7 left-0 right-0 z-[52] mx-auto w-full max-w-5xl 
				overflow-y-auto rounded-md scrollbar-hide"
			>
				<>
					<button
						onClick={handleClose}
						className="modalButton absolute right-5 top-5 !z-50 h-9 w-9
                        border-none bg-[#939393] hover:bg-[#686868]"
					>
						<XIcon className="h-6 w-6 " />
					</button>

					<div className="relative pt-[56.25%]">
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${trailer}`}
							width="100%"
							height="100%"
							style={{ position: 'absolute', top: '0', left: '0' }}
							playing
							muted={muted}
						/>

						<div
							className="absolute bottom-10 flex w-full items-center 
							justify-between px-10"
						>
							<div className="flex items-center justify-between space-x-2">
								<button
									className="flex items-center gap-x-2 rounded
								 bg-white px-8 py-2 text-xl font-bold text-black transition 
								 hover:bg-[#e6e6e6]"
								>
									<FaPlay className="h-5 w-5" />
									Play
								</button>

								<button className="modalButton bg-[#646464aa] hover:bg-[#919191]">
									<PlusIcon className="h-5 w-5 " />
								</button>

								<button className="modalButton bg-[#646464aa] hover:bg-[#919191]">
									<ThumbUpIcon className="h-5 w-5" />
								</button>
							</div>

							<button
								className="modalButton bg-[#646464aa] hover:bg-[#919191]
							"
								onClick={() => setMuted((prevState) => !prevState)}
							>
								{muted ? (
									<VolumeOffIcon className="h-5 w-5 " />
								) : (
									<VolumeUpIcon className="h-5 w-5 " />
								)}
							</button>
						</div>
					</div>

					<div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
						<div className="space-y-6 text-lg">
							<div className="flex items-center space-x-2 text-sm">
								<p className="font-semibold text-green-400">
									{movie?.vote_average * 10} % Match
								</p>
								<p className="font-light">
									{movie?.release_date || movie?.first_air_date}
								</p>
								<div
									className="flex h-4 items-center justify-center rounded
								border border-white/40 px-1.5 text-xs"
								>
									HD
								</div>
							</div>

							<div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
								<p className="w-5/6 md:w-2/3">{movie?.overview}</p>
								<div className="flex flex-col space-y-3 text-sm">
									<div className="">
										<span className="text-[gray]">Genres : </span>
										{genres.map((genre) => genre.name).join(',')}
									</div>

									<div>
										<span className="text-[gray]"> Original Language : </span>
										{movie?.original_language}
									</div>

									<div>
										<span className="text-[gray]">Vote Count : </span>
										{movie?.vote_count}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			</MuiModal>
		</div>
	);
}

export default Modal;
