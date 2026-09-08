import { Button } from "@components/Button";

declare global {
    interface Window {
        store: any;
    }
}

interface PageState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

interface Transaction {
    id: string;
    description: string;
    amount: number;
}

export function renderSettingsPage(state: PageState): HTMLDivElement {
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

function clearExpenses(): void {
    window.store.dispatch({
        type: "CLEAR_TRANSACTIONS"
    })
}
