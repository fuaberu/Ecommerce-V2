import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGetAllProductsQuery } from '../app/sevices/products';
import ProductCard from '../components/product/ProductCard';

const Homepage = () => {
	const { data, error, isLoading } = useGetAllProductsQuery();

	useEffect(() => {
		console.log(data, error);
	}, [error, data]);

	return (
		<div>
			<HeroContainer>hero</HeroContainer>
			<ProductsContainer>
				<h2>Latest Products</h2>
				<ProductsDisplay>
					{data &&
						data.products.map((prod, index) => {
							return <ProductCard key={index} product={prod} />;
						})}
				</ProductsDisplay>
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

export const ProductsDisplay = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
	padding: 1rem;
`;

export default Homepage;
