import { createRouter } from "./router";
import { createStore } from "./store";
import { reducer } from "./reducer";
import { renderHomePage } from "./pages/home";
import { renderListPage } from "./pages/list";
import { renderDetailPage } from "./pages/detail";
import { renderSettingsPage } from "./pages/settings";
import { storageMiddleware, loadState } from "./storage";
const defaultState = {
    transactions: [],
    route: {
        path: "/home",
        params: {}
    },
    loading: false,
    error: null
};
const savedState = loadState();
const initialState = savedState
    ? {
        ...defaultState,
        ...savedState
    }
    : defaultState;
const store = createStore(initialState, reducer, storageMiddleware);
window.store = store;
store.subscribe(() => {
    console.log("State changed: ", store.getState());
});
console.log(store.getState());
const router = createRouter(store);
window.router = router;
router.register("/home", renderHomePage);
router.register("/list", renderListPage);
router.register("/detail/:id", renderDetailPage);
router.register("/settings", renderSettingsPage);
store.subscribe(() => {
    const state = store.getState();
    const route = state.route;
    if (!route || !route.component) {
        return;
    }
    const page = route.component(state, route.params);
    const app = document.querySelector("#app");
    if (!app) {
        return;
    }
    app.replaceChildren(page);
});
router.handleRoute();
