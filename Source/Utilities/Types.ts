/*!
 * Callisto, a simple and powerful bot package for nin0-dev's chat server.
 * Copyright (c) 2022 Kodarru and contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// ******

/**
 *
 * The message object that is received from the chat server.
 *
 * @interface Message
 * @property {string} content - The content of the message.
 * @property {string} username - The username of the sender.
 * @property {number} role - The role of the sender.
 * @property {number} op (may not exist) - The op status of the sender.
 * @property {Message[]} messages (may not exist) - The list of messages that were sent before the bot was started.
 * @property {string} user (may not exist) - The user that sent the message.
 * @property {boolean} stale (may not exist) - When a message is declared as stale, it means it is not a new message and was sent before the bot was started.
 * @property {function} isMod - Checks if the message was sent by a admin/mod.
 * @property {function} isBot - Checks if the message was sent by a bot.
 * @property {function} isDiscord - Checks if the message was sent by Discord.
 * @property {function} isUser - Checks if the message was sent by a user.
 * @property {function} isSelf - Checks if the message was sent by the bot itself.
 * @property {function} Send - Sends a message to the chat server.
 * @property {function} Reply - Replies to the message.
 */

export interface Message {
    content: string;
    username: string;
    role: number;
    op?: number;

    //? The list of messages that were sent before the bot was started.
    messages?: Message[];

    //! Will be deprecated with the new chat server. Only needed for previous messages.
    user?: string;

    //? When a message is declared as stale, it means it is not a new message and was sent before the bot was started.
    stale?: boolean;

    //? When a message is received, it will be patched with the following functions.
    isMod(): boolean;
    isBot(): boolean;
    isDiscord(): boolean;
    isUser(): boolean;
    isSelf(): boolean;
    Send(content: string): void;
    Reply(content: string): void;
}

/**
 * The client data object.
 *
 * @interface ClientData
 * @property {string} username - The username of the bot.
 * @property {string} key - The key of the bot.
 * @property {Message[]} staleMessages - The list of messages that were sent before the bot was started.
 */

export interface ClientData {
    username: string;
    key: string;
    staleMessages: Message[];
}

/**
 * The websocket data object.
 *
 * @interface WebsocketData
 * @property {string} URI - The URI of the websocket server.
 * @property {boolean} Reconnect - Whether to reconnect to the server.
 * @property {number} ReconnectMaxTrials - The maximum number of trials to reconnect to the server. Set to 0 if you already set reconnect to false.
 */

export interface WebsocketData {
    URI: string;
    Reconnect: boolean;
    ReconnectMaxTrials: number;
}
