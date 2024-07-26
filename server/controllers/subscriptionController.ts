import { Request, Response } from 'express';
import EmailSubscription from '../models/subscriptionModel';
import { formatResponse } from '../utils/responseFormatter';
import * as subscriptionService from "../services/subscriptionService"

export const subscribe = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const userExist = await EmailSubscription.findOne({ email });
        if (userExist) {
            res.status(409).json(formatResponse('error', 'Email registered please check email', {}));
        }
        else {
            const confirmationCode = subscriptionService.generateConfirmationCode();
            const newEmail = new EmailSubscription({ email, confirmationCode, confirmed: false });
            await newEmail.save();
            subscriptionService.sendConfirmationEmail(email, confirmationCode);
            res.status(200).json(formatResponse('success', 'Please confirm your email', {}));
        }
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Failed to subcribe', (error as Error).message));
    }
};

export const unsubscribe = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        await EmailSubscription.deleteOne({ email });
        res.status(200).json(formatResponse('success', 'Unsubscribed successfully', {}));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Failed to unsubcribe', (error as Error).message));
    }
};

export const confirmEmail = async (req: Request, res: Response) => {
    try {
        const { email, confirmationCode } = req.body;
        const emailRecord = await EmailSubscription.findOne({ email, confirmationCode });
        if (emailRecord) {
            emailRecord.confirmed = true;
            await emailRecord.save();
            res.status(200).json(formatResponse('success', 'Email confirmed', {}));
        } else {
            res.status(400).json(formatResponse('success', 'Invalid confirmation code', {}));
        }
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Failed to confirm e', (error as Error).message));
    }
};
