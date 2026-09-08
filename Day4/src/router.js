const BASE_PATH = "";
export function createRouter(store) {
    const routes = [];
    function register(path, component) {
        routes.push({
            path,
            component
        });
    }
    function matchRoute(pathname) {
        for (const route of routes) {
            const routeParts = route.path.split("/");
            const pathParts = pathname.split("/");
            if (routeParts.length !== pathParts.length) {
                continue;
            }
            const params = {};
            let matches = true;
            for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i].startsWith(":")) {
                    const paramName = routeParts[i].slice(1);
                    params[paramName] = pathParts[i];
                }
                else if (routeParts[i] !== pathParts[i]) {
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
    function navigate(path) {
        history.pushState({}, "", BASE_PATH + path);
        handleRoute();
    }
    function handleRoute() {
        let pathname = window.location.pathname;
        if (pathname.startsWith(BASE_PATH)) {
            pathname = pathname.slice(BASE_PATH.length);
        }
        if (pathname === "" || pathname === "/") {
            navigate("/home");
            return null;
        }
        const match = matchRoute(pathname);
        if (!match) {
            console.error("Route not found:", pathname);
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
    window.addEventListener("popstate", handleRoute);
    return {
        register,
        navigate,
        handleRoute
    };
}
