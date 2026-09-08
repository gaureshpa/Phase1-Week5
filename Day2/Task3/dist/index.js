"use strict";
;
// handleResponse<T>
function handleResponse(response) {
    if (response.success) {
        console.log("Data:", response.data);
    }
    else {
        console.log("Error:", response.error);
        console.log("Status Code:", response.statusCode);
    }
}
// Test ApiResponse
const successResponse = {
    success: true,
    data: {
        id: 1,
        name: "Mbappe",
        avatar: "mbappe.jpg",
        createdAt: "2026-09-01"
    }
};
const errorResponse = {
    success: false,
    error: "User not found",
    statusCode: 404
};
handleResponse(successResponse);
handleResponse(errorResponse);
function renderUsers(state) {
    if (state.status === "idle") {
        return "<p> Nothing started yet</p>";
    }
    if (state.status === "loading") {
        return "<p>Loading...</p>";
    }
    if (state.status === "success") {
        return `<p>Users: ${state.data.length}</p>`;
    }
    if (state.status === "error") {
        return `<p>Error: ${state.error.message}</p>`;
    }
    return "";
}
// Test LoadingState
const idle = {
    status: "idle"
};
const loading = {
    status: "loading"
};
const success = {
    status: "success",
    data: [
        {
            id: 1,
            name: "Mbappe",
            avatar: "mbappe.jpg",
            createdAt: "2026-01-09"
        }
    ]
};
const error = {
    status: "error",
    error: new Error("Failed to find the user"),
};
console.log(renderUsers(idle));
console.log(renderUsers(loading));
console.log(renderUsers(success));
console.log(renderUsers(error));
