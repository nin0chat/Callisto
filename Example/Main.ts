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
// Import the necessary modules.
import { Client, type Callisto } from "../Source/Main.ts";

// ******

const client = new Client({
    Bot: {
        username: "YOUR_BOT_NAME",
        key: "YOUR_BOT_KEY",
        // Has no use implemented yet. Leave it as an empty array.
        staleMessages: [],
    },
    Websocket: {
        URI: "wss://guhws.nin0.dev",
        Reconnect: true,
        ReconnectMaxTrials: 5,
    },
    LogLevel: 2,
});

const Log = client.Logger;
let prefix = "!";

// This function will be called when the Websocket is opened.
client.On("open", () => {
    Log.Info("Connection established!");
    client.Send("Hello, world! My prefix is " + prefix + ". Type " + prefix + "help for a list of commands.");
});

// This function will be called when the Websocket receives a message.
client.On("message", (message: Callisto.Message) => {
    // Will not respond to bots.
    if (message.isBot()) return;
    // Will not respond to itself.
    if (message.isSelf()) return;

    /*
     * The message object has the following functions:
     *
     *  isMod(): boolean; - Checks if the message was sent by a admin/mod.
     *  isBot(): boolean; - Checks if the message was sent by a bot.
     *  isDiscord(): boolean; - Checks if the message was sent from Discord.
     *  isUser(): boolean; - Checks if the message was sent by a user.
     *  isSelf(): boolean; - Checks if the message was sent by the bot.
     *  Send(content: string): void; - Sends a message to the chat.
     *  Reply(content: string): void; - Replies to the user who sent the message.
     */

    // Check if the message starts with the prefix.
    if (message.content?.startsWith(prefix)) {
        // Split the message into an array of arguments.
        // Example: !ping hello world
        // Output: ["ping", "hello", "world"]
        const args = message.content.slice(prefix.length).split(/ +/);
        // Shift the first argument from the array.
        // Example: ["ping", "hello", "world"]
        // Output: "ping"
        const command = args.shift()?.toLowerCase();

        switch (command) {
            case "ping":
                // message.Reply will reply to the user who sent the message.
                // Example: message.Reply("Pong!");
                // Output: Replying to <username>: Pong!
                message.Reply("Pong!");
                break;
            case "prefix":
                prefix = args[0];
                message.Reply("Prefix set to " + prefix);
                break;
            case "say":
                // message.Send will send a message to the chat.
                // Example: message.Send("Hello, world!");
                // Output: Hello, world!
                // Note: This will not reply to the user.
                message.Send(args.join(" "));
                break;
            case "help":
                message.Reply("Commands: help, ping, say, prefix");
                break;
        }
    }
});

// Connects to the Websocket server.
client.Connect();
