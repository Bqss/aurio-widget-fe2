import { writable } from 'svelte/store';

// Define route types
export interface RouteInfo {
	name: string;
	params?: Record<string, string>;
	data?: any;
}

// Available routes
export const ROUTES = {
	HOME: 'home',
	CONSULTATION_DETAIL: 'consultationDetail'
} as const;

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];

// Current route store - starts with home
export const currentRoute = writable<RouteInfo>({
	name: ROUTES.HOME
});

// Navigation history for back functionality
export const routeHistory = writable<RouteInfo[]>([{ name: ROUTES.HOME }]);

// Navigation functions
export const navigate = {
	toHome: () => {
		const newRoute: RouteInfo = { name: ROUTES.HOME };
		currentRoute.set(newRoute);
		routeHistory.update(history => [...history, newRoute]);
	},
	toConsultationDetail: (id: string, data?: any) => {
		const newRoute: RouteInfo = {
			name: ROUTES.CONSULTATION_DETAIL,
			params: { id },
			data
		};
		currentRoute.set(newRoute);
		routeHistory.update(history => [...history, newRoute]);
	},
	back: () => {
		routeHistory.update(history => {
			if (history.length > 1) {
				const newHistory = history.slice(0, -1);
				const previousRoute = newHistory[newHistory.length - 1];
				currentRoute.set(previousRoute);
				return newHistory;
			}
			return history;
		});
	},
	replace: (routeName: RouteNames, params?: Record<string, string>, data?: any) => {
		const newRoute: RouteInfo = { name: routeName, params, data };
		currentRoute.set(newRoute);
		// Replace current route in history instead of adding
		routeHistory.update(history => {
			if (history.length > 0) {
				return [...history.slice(0, -1), newRoute];
			}
			return [newRoute];
		});
	}
};

// Helper functions
export const isCurrentRoute = (routeName: RouteNames): boolean => {
	let current: RouteInfo = { name: ROUTES.HOME };
	const unsubscribe = currentRoute.subscribe(route => current = route);
	unsubscribe();
	return current.name === routeName;
};

export const canGoBack = (): boolean => {
	let history: RouteInfo[] = [];
	const unsubscribe = routeHistory.subscribe(h => history = h);
	unsubscribe();
	return history.length > 1;
};

export const getCurrentRoute = (): RouteInfo => {
	let current: RouteInfo = { name: ROUTES.HOME };
	const unsubscribe = currentRoute.subscribe(route => current = route);
	unsubscribe();
	return current;
};