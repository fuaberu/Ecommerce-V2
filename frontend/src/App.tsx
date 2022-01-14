import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles/GlobalStyle';

//components
import Layout from './layouts/Layout';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';

function App() {
	return (
		<Fragment>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Homepage />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</Fragment>
	);
}

export default App;
