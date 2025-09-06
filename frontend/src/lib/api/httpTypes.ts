export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends RequestInit {
	token?: string;
}

export type ConflictDetails = {
	field: string;
	issue: string;
};

// Default API error class
export class ApiError extends Error {
	status: number;
	error: string;
	details?: ConflictDetails;

	constructor(
		status: number = 500,
		error: string = "Error",
		message: string = "An unexpected error occurred",
		details?: ConflictDetails
	) {
		super(message);
		this.status = status;
		this.error = error;
		this.details = details;

		Object.setPrototypeOf(this, ApiError.prototype);
	}
}
