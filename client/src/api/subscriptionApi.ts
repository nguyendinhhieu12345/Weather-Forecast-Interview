import * as httpRequest from "@/utils/httpRequest";

export const postSubscription = async (
    email: string
) => {
    try {
        const res = await httpRequest.post(
            `subscribe`,
            {
                email
            }
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const postUnSubscription = async (
    email: string
) => {
    try {
        const res = await httpRequest.post(
            `subscribe/unsubscribe`,
            {
                email
            }
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const postConfirmSubscription = async (
    email: string,
    confirmationCode: string
) => {
    try {
        const res = await httpRequest.post(
            `subscribe/confirm`,
            {
                email,
                confirmationCode
            }
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};