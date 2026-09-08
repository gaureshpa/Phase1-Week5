import { createStore } from "./store.js";
function kanbanReducer(state, action) {
    switch (action.type) {
        case "ADD_CARD":
            return { ...state, cards: [...state.cards, action.payload] };
        case "REMOVE_CARD":
            return { ...state, cards: state.cards.filter(card => card.id !== action.payload) };
        case "MOVE_CARD":
            return { ...state, cards: state.cards.map(card => card.id === action.payload.id
                    ? { ...card, column: action.payload.column }
                    : card) };
        default:
            return state;
    }
}
const store = createStore({ cards: [] }, kanbanReducer);
store.subscribe((state) => {
    console.log("State:", state);
});
store.subscribe((state) => {
    console.log("State:", state);
});
store.dispatch({
    type: "ADD_CARD",
    payload: {
        id: 1,
        title: "Wash clothes",
        column: "todo"
    }
});
store.dispatch({
    type: "MOVE_CARD",
    payload: {
        id: 1,
        column: "done"
    }
});
console.log(store.getState());
