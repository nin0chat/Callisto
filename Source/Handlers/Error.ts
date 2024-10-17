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

export function On_Error(error: string, client: Client) {
    return () => {
        client.Emit("error");
        client.Logger.Error("An unexpected error occurred! " + error);
    };
}
