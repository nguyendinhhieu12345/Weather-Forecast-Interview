export type ApiResponse<T> = {
    status: string;
    message: string;
    data?: T;
};

export const formatResponse = <T>(status: string, message: string, data?: T): ApiResponse<T> => {
    return {
        status,
        message,
        data,
    };
};
