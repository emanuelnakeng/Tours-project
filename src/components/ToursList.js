import React, { useState, useEffect } from 'react';
import Tour from './Tour';
import PuffLoader from 'react-spinners/PuffLoader';

const ToursList = () => {
	const url = 'https://course-api.com/react-tours-project';
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [tours, setTours] = useState([]);

	const getTours = async () => {
		try {
			const resp = await fetch(url);
			if ((resp.status >= 200) & (resp.status <= 299)) {
				const tours = await resp.json();
				setTours(tours);
				setIsLoading(false);
			} else {
				setIsLoading(false);
				setIsError(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getTours();
	}, []);

	const removeTourHandler = id => {
		const newTours = tours.filter(tour => tour.id !== id);
		setTours(newTours);
	};

	if (isLoading) {
		return (
			<main>
				<div className='title'>
					<h2>Our Best Tours</h2>
					<div className='underline'></div>
					<PuffLoader
						speedMultiplier={2}
						color={'var(--clr-primary-5)'}
					/>
				</div>
			</main>
		);
	}

	if (isError) {
		return (
			<main>
				<div className='title'>
					<h2>Error No Tours Found</h2>
					<div className='underline'></div>
				</div>
			</main>
		);
	}

	if (tours.length === 0) {
		return (
			<main>
				<div className='title'>
					<h2>No Tours left</h2>
					<div className='underline'></div>
					<button className='btn' onClick={() => getTours()}>
						Refresh
					</button>
				</div>
			</main>
		);
	}

	return (
		<main>
			<div className='title'>
				<h2>Our Best Tours</h2>
				<div className='underline'></div>
			</div>
			{tours.map(tour => {
				return (
					<Tour
						key={tour.id}
						name={tour.name}
						price={tour.price}
						info={tour.info}
						image={tour.image}
						removeTour={() => removeTourHandler(tour.id)}
					/>
				);
			})}
		</main>
	);
};

export default ToursList;
