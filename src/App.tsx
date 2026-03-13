import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import './App.css';
import { LoadingProvider } from './context/LoadingContext';
import { NotFoundPage } from './layouts/NotFoundPage';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './module/HomePage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<NotFoundPage />}>
			<Route path='/' element={<RootLayout />}>
				<Route path='/' element={<HomePage />} />
			</Route>
		</Route>
	),
	{
		future: { v7_normalizeFormMethod: true },
	}
);

export const App = () => {
	return (
		<LoadingProvider>
			<RouterProvider router={router} />
		</LoadingProvider>
	);
};
