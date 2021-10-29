import React, { useState } from 'react';

const Tour = props => {
	const { name, image, info, price, removeTour } = props;
	const [readMore, setReadMore] = useState(false);
	return (
		<article className='single-tour'>
			<img src={image} alt={name} />
			<footer>
				<div className='tour-info'>
					<h4>{name}</h4>
					<h4 className='tour-price'>R{price}</h4>
				</div>
				<p>
					{readMore ? info : `${info.substring(0, 200)}...`}
					<button
						onClick={() => setReadMore(!readMore)}
						href='#'
						className='delete-btn'
					>
						{readMore ? 'show less' : '  read more'}
					</button>
				</p>
				<button className='delete-btn' onClick={removeTour}>
					not interested
				</button>
			</footer>
		</article>
	);
};

export default Tour;
