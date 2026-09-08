import { Card } from "@components/Card";
import { Button } from "@components/Button";
export function renderDetailPage(state, params) {
    const page = document.createElement("div");
    page.className = "page";
    const heading = document.createElement("h1");
    heading.textContent = "Expense Detail";
    page.append(heading);
    if (state.loading) {
        const loadingMessage = document.createElement("p");
        loadingMessage.className = "loading";
        loadingMessage.textContent = "Loading expense...";
        page.append(loadingMessage);
        return page;
    }
    if (state.error) {
        const errorMessage = document.createElement("p");
        errorMessage.className = "error";
        errorMessage.textContent = state.error;
        page.append(errorMessage);
        return page;
    }
    const transactionId = params?.id;
    if (!transactionId) {
        const message = document.createElement("p");
        message.className = "error";
        message.textContent = "Expense ID is missing";
        page.append(message);
        return page;
    }
    const transaction = state.transactions.find((item) => item.id === transactionId);
    if (!transaction) {
        const message = document.createElement("p");
        message.className = "error";
        message.textContent = `Expense ${transactionId} not found`;
        page.append(message);
        return page;
    }
    const card = Card({
        title: transaction.description,
        content: `Rs. ${transaction.amount}`
    });
    const backButton = Button({
        text: "Back to Expenses",
        onClick: () => {
            window.history.back();
        }
    });
    page.append(card, backButton);
    return page;
}
