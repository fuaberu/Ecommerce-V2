import React from 'react';
import styled from 'styled-components';

const Homepage = () => {
	return (
		<div>
			<HeroContainer>hero</HeroContainer>
			<ProductsContainer>
				<h2>Latest Products</h2>
				<div></div>
				<div>products</div>
			</ProductsContainer>
		</div>
	);
};

const HeroContainer = styled.section`
	min-height: calc(100vh - ${(props) => props.theme.navHeight});
`;

const ProductsContainer = styled.section`
	min-height: 100vh;
`;

export default Homepage;
