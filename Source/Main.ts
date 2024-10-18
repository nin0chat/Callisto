/*!
 * Callisto, a simple and powerful bot package for nin0-dev"s chat server.
 * Copyright (c) 2022 nin0chat and contributors.
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
// Import all the necessary modules.
import Websocket from "ws";
import { Logging } from "@/Utilities/Logging.ts";
import * as Callisto from "@/Utilities/Types.ts";

// Import the handlers.
import { On_Open } from "@/Handlers/Open.ts";
import { On_Close } from "@/Handlers/Close.ts";
import { On_Message } from "@/Handlers/Message.ts";

// *****
// Export types
export * as Callisto from "@/Utilities/Types.ts";

/**
 * The main client class for Callisto.
 *
 * Example usage:
 *
 * ```typescript
 * const client = new Client({
 *     Bot: {
 *         username: "Ko-Ko",
 *         key: "xxx",
 *         staleMessages: []
 *     },
 *     Websocket: {
 *         URI: "wss://guhws.nin0.dev",
 *         Reconnect: true,
 *         ReconnectMaxTrials: 5
 *     },
 *     LogLevel: 2
 * });
 * ```
 *
 * @param {Callisto.ClientData} Bot - The client data.
 * ```json
 * {
 *     username: "<Your bot's username>",
 *     key: "<Your bot's key>",
 *     staleMessages: []
 * }
 * ```
 * @param {Callisto.WebsocketData} Websocket - The websocket data.
 * ```json
 * {
 *    URI: "<The URI of the websocket server>",
 *    Reconnect: true,
 *    ReconnectMaxTrials: 5
 * }
 * @param {1 | 2 | 3 | 4} [LogLevel=2] - The logging level. Defaults to 2.
 * @returns {void}
 */

export class Client {
    // Properties for the client class. (Required)
    private WS: Websocket;
    public Logger: Logging;
    public ClientData: Callisto.ClientData;
    public WebsocketData: Callisto.WebsocketData;

    // Other properties.
    public ReconnectAttempts: number = 0;
    public DisconnectIntentional: boolean = false;

    // Handlers are used for event handling. They are arrays of strings and functions.
    // The strings are the event names, and the functions are the event handlers.
    private Handlers: Array<(string | Function)[]>;

    // OnceHandlers are used for one-time event handling. They are arrays of strings, functions, and booleans.
    // The boolean is used to determine whether the event handler has been run.
    private OnceHandlers: Array<(string | Function | boolean)[]>;

    // Constructor for the Client class.
    constructor({
        Bot,
        Websocket,
        LogLevel = 2,
    }: {
        Bot: Callisto.ClientData;
        Websocket: Callisto.WebsocketData;
        LogLevel?: 1 | 2 | 3 | 4;
    }) {
        this.Logger = new Logging(LogLevel);
        this.Logger.Debug("Starting client... may take a bit.");

        // Set the client data and websocket data.
        this.ClientData = Bot;
        this.WebsocketData = Websocket;
        this.Handlers = [];
        this.OnceHandlers = [];
    }

    /**
     * Connect to the websocket server.
     * **This function should ONLY be called after you have registered all of your event handlers.**
     * Not doing so may result in missed events.
     * @returns {boolean} - Whether the connection was successful.
     */

    public Connect(): boolean {
        this.Logger.Info("Attempting to connect to the server...");

        try {
            this.Logger.Debug("Connecting to the server...");
            this.WS = new Websocket(this.WebsocketData.URI);
            this.RegisterHandlers();
            this.Logger.Info("Connected to the server.");
        } catch (error) {
            this.Logger.Error(`An error occurred while connecting to the server: ${error}`);
            return false;
        }

        return true;
    }

    // Register the package"s event handlers.
    private RegisterHandlers(): void {
        this.Logger.Debug("Registering event handlers...");
        this.WS.on("open", On_Open(this));
        this.WS.on("close", On_Close(this));
        this.WS.on("message", (data: Callisto.Message) => On_Message(data, this));
    }

    /**
     * Sends a message to the websocket connection.
     *
     * @param {string} message - The message to send.
     * @param {boolean} [raw=false] - Whether to send the message as raw data. Defaults to false.
     * @returns {void}
     */

    public Send(message: string, raw: boolean = false): void {
        if (raw) {
            this.Logger.Debug(`Sending RAW message: ${message}`);
            this.WS.send(message);
            return;
        }

        this.Logger.Debug(`Sending message: ${message}`);

        const data = JSON.stringify({
            content: message,
            username: this.ClientData.username,
            key: this.ClientData.key,
        });

        this.WS.send(data);
    }

    /**
     * Get stale messages cached by the client.
     * @returns {Array<Callisto.Message>} - An array of stale messages
     */

    public get StaleMessages(): Callisto.Message[] {
        this.Logger.Debug("Retrieving stale messages...");
        return this.ClientData.staleMessages;
    }

    /**
     * Listen for an event and run a function when it is emitted.
     * @param event The event to listen for.
     * @param handler The function to run when the event is emitted.
     * @returns {void}
     */
    public On(event: string, handler: Function): void {
        this.Logger.Debug(`New event handler registered for event ${event}.`);
        this.Handlers.push([event, handler]);
    }

    /**
     * Listen for an event and run a function when it is emitted. The function will only run once.
     * @param event The event to listen for.
     * @param handler The function to run when the event is emitted.
     * @returns {void}
     */
    public Once(event: string, handler: Function): void {
        this.Logger.Debug(`New one-time event handler registered for event ${event}.`);
        this.OnceHandlers.push([event, handler, false]);
    }

    /**
     * Remove an event handler.
     *
     * @param event The event to remove the handler from.
     * @param handler The handler to remove.
     * @returns {void}
     */

    public Off(event: string, handler: Function): void {
        this.Logger.Debug(`Removing event handler for event ${event}.`);

        this.Handlers = this.Handlers.filter((h) => {
            return h[0] !== event || h[1] !== handler;
        });

        this.OnceHandlers = this.OnceHandlers.filter((h) => {
            return h[0] !== event || h[1] !== handler;
        });
    }

    /**
     * Emit an event.
     * @param event The event to emit.
     * @param args The arguments to pass to the event handler.
     * @returns {void}
     */

    public Emit(event: string, ...args: any[]): void {
        this.Logger.Debug(`Emitting event ${event}.`);

        this.Handlers.forEach((handler) => {
            if (handler[0] === event && typeof handler[1] === "function") {
                handler[1](...args);
            }
        });

        this.OnceHandlers.forEach((handler) => {
            if (handler[0] === event && typeof handler[1] === "function" && !handler[2]) {
                handler[1](...args);
                handler[2] = true;
            }
        });
    }

    /**
     * Discards all event handlers.
     * @returns {void}
     */

    public ClearHandlers(): void {
        this.Logger.Debug("Clearing all event handlers...");
        this.Handlers = [];
    }

    /**
     * Disconnect from the websocket server.
     * @returns {void}
     */
    public Disconnect(): void {
        this.Logger.Info("Attempting to disconnect from the server...");
        this.ClearHandlers();

        if (this.WS.readyState === Websocket.OPEN) {
            this.WS.close();
            this.DisconnectIntentional = true;
            this.Logger.Info("Disconnected from the server.");
        } else {
            this.Logger.Warning("Could not disconnect from the server. Is the websocket connected?");
        }
    }
}
