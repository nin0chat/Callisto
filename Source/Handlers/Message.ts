/*!
 * Callisto, a simple and powerful bot package for nin0-dev's chat server.
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

import type { Client } from "@/Main.ts";
import * as Constants from "@/Utilities/Constants.ts";

// ******

export function On_Message(data: any, client: Client) {
    client.Logger.Debug("Event Handler `On_Message` has been triggered.");

    const _data = JSON.parse(data.toString());

    const patchedMessage = {
        username: _data.username,
        content: _data.content,
        role: _data.role,
        isMod: function () {
            return _data.role === Constants.Roles.Admin;
        },
        isBot: function () {
            return _data.role === Constants.Roles.Bot;
        },
        isDiscord: function () {
            return _data.role === Constants.Roles.Discord;
        },
        isUser: function () {
            return _data.role === Constants.Roles.User;
        },
        isSelf: function () {
            return _data.username === client.ClientData.username;
        },
        isMentioned: function () {
            return _data.content?.includes(client.ClientData.username);
        },
        Send: function (content: string) {
            client.Send(content);
        },
        Reply: function (content: string) {
            client.Send("Replying to " + _data.username + ": " + content);
        },
    };

    /*
    if (data.op === 10) {
        client.Logger.Info("Found stale messages.");

        data.messages?.forEach((message: Callisto.Message) => {
            message.user = data.username;
            message.stale = true;
            client.StaleMessages.push(message);
        });

        return;
    }
    */

    client.Emit("message", patchedMessage);
}
