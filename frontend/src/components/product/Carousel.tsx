import React, { useState } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { VscDebugBreakpointLogUnverified, VscDebugBreakpointLog } from 'react-icons/vsc';
import styled from 'styled-components';

interface Image {
	public_id: string;
	url: string;
}

const Carousel = ({ images }: { images: Image[] }) => {
	const [current, setCurrent] = useState<number>(0);

	const nextSlide = () => {
		setCurrent(current === images.length - 1 ? 0 : current + 1);
	};

	const prevSlide = () => {
		setCurrent(current === 0 ? images.length - 1 : current - 1);
	};
	return (
		<ContainerDiv style={{ height: '400px' }}>
			<LeftArrow onClick={() => prevSlide()}>
				<FaChevronLeft />
			</LeftArrow>
			<RightArrow onClick={() => nextSlide()}>
				<FaChevronRight />
			</RightArrow>
			<InnerDiv style={{ transform: `translateX(-${current * 100}%)` }}>
				{images.map((image, index) => (
					<ItemDiv key={index}>
						<img src={image.url} alt="" />
					</ItemDiv>
				))}
			</InnerDiv>
			<ShowSlide>
				{images.map((img, index) =>
					index === current ? (
						<VscDebugBreakpointLog key={index} />
					) : (
						<VscDebugBreakpointLogUnverified key={index} />
					)
				)}
			</ShowSlide>
		</ContainerDiv>
	);
};

const ContainerDiv = styled.div`
	position: relative;
	overflow: hidden;
	display: flex;
`;
const InnerDiv = styled.div`
	display: flex;
	min-width: 100%;
	transition: 0.7s;
`;
const ItemDiv = styled.div`
	height: 100%;
	min-width: 100%;
	flex-grow: 1;
	flex-shrink: 1;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	img {
		max-width: 100%;
		max-height: 92%;
	}
`;

const LeftArrow = styled.button`
	position: absolute;
	cursor: pointer;
	top: 50%;
	z-index: 2;
	left: 5%;
`;
const RightArrow = styled.button`
	position: absolute;
	cursor: pointer;
	top: 50%;
	z-index: 2;
	right: 5%;
`;

const ShowSlide = styled.div`
	position: absolute;
	left: 50%;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
	bottom: 5px;
`;

export default Carousel;
