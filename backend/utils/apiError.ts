export default class ApiError {
	message: string;
	code: number;
	constructor(message: string, code: number) {
		this.message = message;
		this.code = code;
	}
	static badRequest(msg: string) {
		return new ApiError(msg, 400);
	}
	static internal(msg: string) {
		return new ApiError(msg, 500);
	}
}
