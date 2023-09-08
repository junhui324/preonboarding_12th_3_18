import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/constants';
import Main from './pages/MainPage/Main';
import NotFound from './pages/NotFoundPage/NotFound';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';

function App() {
	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<Routes>
					<Route path={ROUTES.MAIN} element={<Main />} />
					<Route path={ROUTES.NOTFOUND} element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
