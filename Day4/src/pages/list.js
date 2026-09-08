import { Card } from "@components/Card";
import { Button } from "@components/Button";
import { Modal } from "@components/Modal";
import { withLoading } from "../utils";
export function renderListPage(state) {
    const page = document.createElement("div");
    const heading = document.createElement("h1");
    page.className = "page";
    heading.textContent = "Expenses";
    page.append(heading);
    if (state.loading) {
        const loadingMessage = document.createElement("p");
        loadingMessage.textContent = "Loading...";
        loadingMessage.className = "loading";
        page.append(loadingMessage);
        return page;
    }
    if (state.error) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = state.error;
        errorMessage.className = "error";
        page.append(errorMessage);
    }
    const addButton = Button({
        text: "Add Expenses",
        onClick: () => {
            showAddExpenseModal();
        }
    });
    page.append(addButton);
    const transactions = state.transactions || [];
    if (transactions.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No expenses yet";
        page.append(emptyMessage);
    }
    transactions.forEach((transaction) => {
        const card = Card({
            title: transaction.description,
            content: `Rs.${transaction.amount}`
        });
        const viewButton = Button({
            text: "View Details",
            onClick: () => {
                window.router.navigate(`/detail/${transaction.id}`);
            }
        });
        const editButton = Button({
            text: "Edit",
            onClick: () => {
                showEditExpenseModal(transaction);
            }
        });
        const deleteButton = Button({
            text: "Delete",
            onClick: () => {
                window.store.dispatch({
                    type: "DELETE_TRANSACTION",
                    payload: transaction.id
                });
            }
        });
        page.append(card, viewButton, editButton, deleteButton);
    });
    return page;
}
function showAddExpenseModal() {
    const form = document.createElement("form");
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.required = true;
    descriptionInput.placeholder = "Description";
    const amountInput = document.createElement("input");
    amountInput.min = "0";
    amountInput.required = true;
    amountInput.placeholder = "Amount";
    amountInput.type = "number";
    const loadingMessage = document.createElement("p");
    loadingMessage.className = "loading";
    loadingMessage.textContent = "Saving...";
    loadingMessage.style.display = "none";
    const actions = document.createElement("div");
    actions.className = "form-actions";
    const saveButton = Button({
        text: "Save Expense",
        type: "submit"
    });
    const cancelButton = Button({
        text: "Cancel",
        onClick: () => {
            modal.remove();
        }
    });
    actions.append(cancelButton, saveButton);
    form.append(descriptionInput, amountInput, loadingMessage, actions);
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const description = descriptionInput.value.trim();
        const amount = Number(amountInput.value);
        if (!description || amount <= 0) {
            window.store.dispatch({
                type: "SET_ERROR",
                payload: "Please fill in all the fileds and use amount greater than Rs. 0"
            });
            return;
        }
        loadingMessage.style.display = "block";
        saveButton.disabled = true;
        cancelButton.disabled = true;
        await withLoading(window.store, async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.store.dispatch({
                type: "ADD_TRANSACTION",
                payload: {
                    id: crypto.randomUUID(),
                    description,
                    amount
                }
            });
        });
        modal.remove();
    });
    const modal = Modal({
        title: "Add Expense",
        content: form
    });
    document.body.append(modal);
    descriptionInput.focus();
}
function showEditExpenseModal(transaction) {
    const form = document.createElement("form");
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.required = true;
    descriptionInput.value = transaction.description;
    const amountInput = document.createElement("input");
    amountInput.min = "0";
    amountInput.required = true;
    amountInput.value = String(transaction.amount);
    amountInput.type = "number";
    const loadingMessage = document.createElement("p");
    loadingMessage.className = "loading";
    loadingMessage.textContent = "Updating..";
    loadingMessage.style.display = "none";
    const actions = document.createElement("div");
    actions.className = "form-actions";
    const saveButton = Button({
        text: "Save Changes",
        type: "submit"
    });
    const cancelButton = Button({
        text: "Cancel",
        onClick: () => {
            modal.remove();
        }
    });
    actions.append(cancelButton, saveButton);
    form.append(descriptionInput, amountInput, loadingMessage, actions);
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const description = descriptionInput.value.trim();
        const amount = Number(amountInput.value);
        if (!description || amount <= 0) {
            window.store.dispatch({
                type: "SET_ERROR",
                payload: "Please fill in all the fileds and use amount greater than Rs. 0"
            });
            return;
        }
        loadingMessage.style.display = "block";
        saveButton.disabled = true;
        cancelButton.disabled = true;
        await withLoading(window.store, async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.store.dispatch({
                type: "UPDATE_TRANSACTION",
                payload: {
                    id: transaction.id,
                    description,
                    amount
                }
            });
        });
        modal.remove();
    });
    const modal = Modal({
        title: "Add Expense",
        content: form
    });
    document.body.append(modal);
    descriptionInput.focus();
}
