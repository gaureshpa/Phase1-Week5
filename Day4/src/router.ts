const BASE_PATH = "";

interface AppState {
    transactions: Transaction[];
    route: Route | null;
    loading: boolean;
    error: string | null;
}

interface Transaction {
    id: string;
    description: string;
    amount: number;
}

interface Route {
    path: string;
    params: Record<string, string>;
    component?: PageComponent;
}

export interface PageComponent {
    (state: AppState, params: Record<string, string>): HTMLElement;
}

export interface Store {
    getState(): AppState;
    dispatch(action: Action): void;
}

interface Action {
    type: string;
    payload?: unknown;
}

interface RegisteredRoute {
    path: string;
    component: PageComponent;
}

interface MatchedRoute {
    component: PageComponent;
    params: Record<string, string>;
}

export function createRouter(store: Store) {
    const routes: RegisteredRoute[] = [];

    function register(
        path: string,
        component: PageComponent
    ): void {
        routes.push({
            path,
            component
        });
    }

    function matchRoute(
        pathname: string
    ): MatchedRoute | null {
        for (const route of routes) {
            const routeParts = route.path.split("/");
            const pathParts = pathname.split("/");

            if (routeParts.length !== pathParts.length) {
                continue;
            }

            const params: Record<string, string> = {};
            let matches = true;

            for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i].startsWith(":")) {
                    const paramName = routeParts[i].slice(1);
                    params[paramName] = pathParts[i];
                } else if (
                    routeParts[i] !== pathParts[i]
                ) {
                    matches = false;
                    break;
                }
            }

            if (matches) {
                return {
                    component: route.component,
                    params
                };
            }
        }

        return null;
    }

    function navigate(path: string): void {
        history.pushState(
            {},
            "",
            BASE_PATH + path
        );

        handleRoute();
    }

    function handleRoute(): MatchedRoute | null {
        let pathname = window.location.pathname;

        if (pathname.startsWith(BASE_PATH)) {
            pathname = pathname.slice(
                BASE_PATH.length
            );
        }

        if (pathname === "" || pathname === "/") {
            navigate("/home");
            return null;
        }

        const match = matchRoute(pathname);

        if (!match) {
            console.error(
                "Route not found:",
                pathname
            );

            return null;
        }

        store.dispatch({
            type: "SET_ROUTE",
            payload: {
                path: pathname,
                params: match.params,
                component: match.component
            }
        });

        return match;
    }

    window.addEventListener(
        "popstate",
        handleRoute
    );

    return {
        register,
        navigate,
        handleRoute
    };
}
