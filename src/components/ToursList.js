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

	return (
		<section>
			{isLoading && (
				<PuffLoader
					speedMultiplier={2}
					color={'var(--clr-primary-5)'}
				/>
			)}
			{isError && <h2>Error occured...</h2>}
			<div className='title'>
				{tours.length >= 1 && <h2>Our Best Tours</h2>}
				{tours.length < 1 && <h2>No Tours Found</h2>}
				<div className='underline'></div>
				{tours.length === 0 && (
					<button className='btn' onClick={() => getTours()}>
						Refresh
					</button>
				)}
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
		</section>
	);
};

export default ToursList;
