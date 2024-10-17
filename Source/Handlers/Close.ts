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

import type { Client } from "@/Main.ts";

// ******

export function On_Close(client: Client) {
    return () => {
        client.Emit("close", client);

        if (client.DisconnectIntentional) return;

        client.Logger.Warning("Connection closed unexpectedly. Attempting to reconnect...");

        if (client.ReconnectAttempts >= client.WebsocketData.ReconnectMaxTrials) {
            // prettier-ignore
            client.Logger.Error("Unable to establish a connection with the server. Tried reconnecting " + client.ReconnectAttempts + " times.");
            return;
        }

        client.ReconnectAttempts++;
        client.Logger.Info("Starting reconnect attempt " + (client.ReconnectAttempts + 1) + "...");
        client.Connect();
    };
}
