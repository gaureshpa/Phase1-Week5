interface User {
    id: number;
    name: string;
    avatar: string;
    createdAt: string;
};

// ApiResponse<T>
type ApiResponse<T> =
    | { success: true; data: T}
    | {success: false; error: string; statusCode: number}


// handleResponse<T>
function handleResponse<T>(response: ApiResponse<T>): void {
    if(response.success) {
        console.log("Data:", response.data);
    }
    else {
        console.log("Error:", response.error);
        console.log("Status Code:", response.statusCode);
    }
}


// Test ApiResponse
const successResponse: ApiResponse<User> = {
    success: true,
    data: {
        id: 1,
        name: "Mbappe",
        avatar: "mbappe.jpg",
        createdAt: "2026-09-01"
    }
};

const errorResponse: ApiResponse<User> = {
    success: false,
    error: "User not found",
    statusCode: 404
};

handleResponse(successResponse);
handleResponse(errorResponse);


// LoadingState<T>

type LoadingState<T> = 
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: Error };

function renderUsers(state: LoadingState<User[]>): string {
    if(state.status === "idle") {
        return "<p> Nothing started yet</p>";
    }

    if(state.status === "loading") {
        return "<p>Loading...</p>";
    }

    if(state.status === "success") {
        return `<p>Users: ${state.data.length}</p>`;
    }

    if(state.status === "error") {
        return `<p>Error: ${state.error.message}</p>`;
    }

    return "";
}
    

// Test LoadingState

const idle: LoadingState<User []> = {
    status: "idle"
}

const loading: LoadingState<User []> = {
    status: "loading"
}

const success: LoadingState<User []> = {
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


const error: LoadingState<User []> = {
    status: "error",
    error: new Error("Failed to find the user"),
};


console.log(renderUsers(idle));
console.log(renderUsers(loading));
console.log(renderUsers(success));
console.log(renderUsers(error));
