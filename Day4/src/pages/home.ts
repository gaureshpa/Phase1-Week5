import { Button } from "@components/Button";
import { Card } from "@components/Card";

interface Transaction {
    id: string;
    description: string;
    amount: number;
}

interface PageState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

declare global {
    interface Window {
        router: any;
    }
}

export function renderHomePage(state: PageState): HTMLDivElement {
    const page = document.createElement("div");
    page.className = "page";

    const heading = document.createElement("h1");
    heading.textContent = "Home";

    page.append(heading);

    if (state.loading) {
        const loadingMessage = document.createElement("p");
        loadingMessage.className = "loading";
        loadingMessage.textContent = "Loading expenses...";

        page.append(loadingMessage);

        return page;
    }

    if (state.error) {
        const errorMessage = document.createElement("p");
        errorMessage.className = "error";
        errorMessage.textContent = state.error;

        page.append(errorMessage);
    }

    const transactions = state.transactions || [];

    // Calculate total
    const totalExpenses = transactions.reduce(
        (total, transaction) => total + Number(transaction.amount),
        0
    );

    const summaryCard = Card({
        title: "Total expenses",
        content: `Rs. ${totalExpenses.toFixed(2)}`
    });

    const countCard = Card({
        title: "Number of expenses",
        content: `${transactions.length}`
    });

    page.append(summaryCard, countCard);

    const addButton = Button({
        text: "Manage Expenses",
        onClick: () => {
            window.router.navigate("/list");
        }
    });

    const settingButton = Button({
        text: "Settings",
        onClick: () => {
            window.router.navigate("/settings");
        }
    });

    page.append(addButton, settingButton);
    return page;
}
