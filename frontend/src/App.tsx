import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLoadUserMutation } from './app/sevices/user';
import { RootState } from './app/store';
import Spinner from './components/smallComponents/Spinner';
import GlobalStyle from './globalStyles/GlobalStyle';

//components
import Layout from './layouts/Layout';
import Homepage from './pages/Homepage';
import LoginSignUp from './pages/LoginSignUp';
import NotFound from './pages/NotFound';
import ProductDetailePage from './pages/ProductDetailePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
	const [loadUser, { isLoading: loadingUser, error: loadError }] = useLoadUserMutation();

	const navigate = useNavigate();

	useEffect(() => {
		loadUser();
		if (loadError) navigate('/');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const user = useSelector((state: RootState) => state.user);

	if (loadingUser) return <Spinner />;
	return (
		<Fragment>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Homepage />} />
					<Route path=":productId" element={<ProductDetailePage />} />
					<Route path="login" element={<LoginSignUp />} />
					<Route path="products" element={<ProductsPage />} />
					{user.user && (
						//protected paths
						<Fragment>
							<Route path="account" element={<ProfilePage />} />
						</Fragment>
					)}
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</Fragment>
	);
}

export default App;
