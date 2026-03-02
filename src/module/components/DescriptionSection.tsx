
export const DescriptionSection = () => {
	return (
		<div
			id='text-animation-wrapper'
			className='pointer-events-none fixed inset-0 z-30 flex items-center justify-center px-6 text-center'
		>
			<div className='max-w-5xl'>
				<p className='highlight-line inline text-2xl font-bold md:text-3xl lg:text-5xl'>
					{/* 第一段 */}
					{'Our gummy supplements'.split(' ').map((word, i) => (
						<span key={`a-${i}`} className='mr-3 inline-block opacity-0'>
							{word}
						</span>
					))}

					{/* ✨ 图片1：人物图，插在 supplements 后面 */}
					<span
						className='card-image hidden overflow-hidden rounded-2xl align-middle md:inline-block'
						style={{
							marginTop: '-18px',
							marginBottom: '-18px',
							height: '85px',
							width: '0px',
							opacity: 0,
							verticalAlign: 'middle',
							position: 'relative',
							zIndex: -1,
						}}
					>
						<img
							src='/images/text-im-1-300x179.jpg'
							className='h-full w-full object-cover'
							alt=''
						/>
					</span>

					{/* 第二段 */}
					{'are Pharmacist/Nutritionist formulated, 100% vegan, cruelty free, gelatin free, pectin based, non GMO,'
						.split(' ')
						.map((word, i) => (
							<span key={`b-${i}`} className='mr-3 inline-block opacity-0'>
								{word}
							</span>
						))}

					{/* ✨ 图片2：风景图，插在 non GMO, 后面 */}
					<span
						className='card-image hidden overflow-hidden rounded-2xl align-middle md:inline-block'
						style={{
							marginTop: '-18px',
							marginBottom: '-18px',
							height: '85px',
							width: '0px',
							opacity: 0,
							verticalAlign: 'middle',
							position: 'relative',
							zIndex: -1,
						}}
					>
						<img
							src='/images/text-im-2-300x172.png'
							className='h-full w-full object-cover'
							alt=''
						/>
					</span>

					{/* 第三段*/}
					{'free from any artificial colors or flavors, manufactured in a GMP & FDA registered facility in US, packaged in recycled bottles.'
						.split(' ')
						.map((word, i) => (
							<span key={`c-${i}`} className='mr-3 inline-block opacity-0'>
								{word}
							</span>
						))}
				</p>
			</div>
		</div>
	);
};
