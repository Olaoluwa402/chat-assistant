import ChatController from "../controllers/chat.controller";
import BaseRoutesConfig from "./base.routes";
import { DefaultRoutePathPrefix } from "../config/config";

import { Application } from "express";

class ChatRoute extends BaseRoutesConfig {
    constructor(app: Application) {
        super(app, "ChatRoutes");
    }

    configureRoutes(): Application {
        this.app
            .route(`${DefaultRoutePathPrefix}/chat-assistant`)
            .post(ChatController.chatAssistant.bind(ChatController));

        return this.app;
    }
}

export { ChatRoute };
