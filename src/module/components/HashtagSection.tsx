export const HashtagSection = () => {
	return (
		<>
			<div
				id='hasgtag-section'
				className='pointer-events-none fixed inset-0 -z-10 flex items-center justify-start'
			>
				<p className='hashtag-line text-3xl font-medium sm:text-4xl lg:text-5xl'>
					{'#VitaminForEveryone #DailyMultivitamin'.split(' ').map((word, i) => (
						<span key={i} className='mr-3 inline-block opacity-0'>
							{word}
						</span>
					))}
					<br />
					{'#PreventiveCare #Energy #Immunity'.split(' ').map((word, i) => (
						<span key={i} className='mr-3 inline-block opacity-0'>
							{word}
						</span>
					))}
				</p>
			</div>
		</>
	);
};
