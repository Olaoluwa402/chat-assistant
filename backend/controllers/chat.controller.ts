import Chat from "../services/chat/chat.service";
import BaseController from "./base.controller";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

class ChatController extends BaseController {
    constructor(public chat: Chat) {
        super();
        this.chat = chat;
    }

    async chatAssistant(req: Request, res: Response, next: NextFunction) {
        try {
            const query = await this.chat.chatAssistant();

            return res.status(httpStatus.CREATED).json({
                status: true,
                message: "Chat Assistant",
                data: query,
            });
        } catch (error) {
            next(error);
        }
    }

}

export default new ChatController(new Chat());
