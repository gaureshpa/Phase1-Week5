import { Button } from "@components/Button";
export function renderSettingsPage(state) {
    const page = document.createElement("div");
    const heading = document.createElement("h1");
    page.className = "page";
    heading.textContent = "Settings";
    const message = document.createElement("p");
    message.className = "success";
    message.textContent = "All expenses cleared";
    const resetButton = Button({
        text: "Clear Expenses",
        onClick: () => {
            clearExpenses();
        }
    });
    page.append(heading, resetButton);
    return page;
}
function clearExpenses() {
    window.store.dispatch({
        type: "CLEAR_TRANSACTIONS"
    });
}
