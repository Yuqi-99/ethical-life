import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import './App.css';
import { NotFoundPage } from './layouts/NotFoundPage';
import { RootLayout } from './layouts/RootLayout';
import { ImageSequencePage } from './components/ImageSequenceHeader';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<NotFoundPage />}>
			<Route path='/' element={<RootLayout />}>
				<Route path='/' element={<ImageSequencePage />} />
			</Route>
		</Route>
	),
	{
		future: { v7_normalizeFormMethod: true },
	}
);

export const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};
