import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface LoadingContextType {
	isLoading: boolean;
	progress: number;
	setTotalAssets: (total: number) => void;
	reportAssetLoaded: () => void;
	finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [totalAssets, setTotalAssetsState] = useState(0);
	const [loadedAssets, setLoadedAssets] = useState(0);
	const [isFinished, setIsFinished] = useState(false);

	const setTotalAssets = useCallback((total: number) => {
		setTotalAssetsState((prev) => prev + total);
	}, []);

	const reportAssetLoaded = useCallback(() => {
		setLoadedAssets((prev) => prev + 1);
	}, []);

	const finishLoading = useCallback(() => {
		setIsFinished(true);
	}, []);

	const progress = useMemo(() => {
		if (totalAssets === 0) return 0;
		return Math.min(Math.round((loadedAssets / totalAssets) * 100), 100);
	}, [loadedAssets, totalAssets]);

	const isLoading = !isFinished || (totalAssets > 0 && loadedAssets < totalAssets);

	const value = useMemo(
		() => ({
			isLoading,
			progress,
			setTotalAssets,
			reportAssetLoaded,
			finishLoading,
		}),
		[isLoading, progress, setTotalAssets, reportAssetLoaded, finishLoading]
	);

	return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (context === undefined) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}
	return context;
};
