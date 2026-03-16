import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface LoadingContextType {
	isLoading: boolean;
	progress: number;
	isFirstVisit: boolean; // 是否是第一次访问
	setTotalAssets: (total: number) => void;
	reportAssetLoaded: () => void;
	finishLoading: () => void;
	markFirstVisitComplete: () => void; // 手动关闭首次访问状态
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// 定义本地存储的 Key
const FIRST_VISIT_KEY = 'has_visited_before';

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [totalAssets, setTotalAssetsState] = useState(0);
	const [loadedAssets, setLoadedAssets] = useState(0);
	const [isFinished, setIsFinished] = useState(false);

	// 初始化时检查 localStorage
	const [isFirstVisit, setIsFirstVisit] = useState(() => {
		return !sessionStorage.getItem(FIRST_VISIT_KEY);
	});

	// 提供一个方法来更新这个状态（比如用户关掉了 Promotion Modal 后调用）
	const markFirstVisitComplete = useCallback(() => {
		sessionStorage.setItem(FIRST_VISIT_KEY, 'true');
		setIsFirstVisit(false);
	}, []);

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
			isFirstVisit,
			setTotalAssets,
			reportAssetLoaded,
			finishLoading,
			markFirstVisitComplete,
		}),
		[
			isLoading,
			progress,
			isFirstVisit,
			setTotalAssets,
			reportAssetLoaded,
			finishLoading,
			markFirstVisitComplete,
		]
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
