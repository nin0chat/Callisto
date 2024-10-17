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

export const NewC_Roles = {
    Guest: 1 << 6,
    User: 1 << 7,
    Bot: 1 << 8,
    System: 1 << 10,
    Mod: 1 << 11,
    Admin: 1 << 12,
};

//! When nin0 rewrites the chat server, the roles will be updated to match the NewC_Roles object.
export const Roles = {
    User: 0,
    Admin: 2,
    Discord: 3,
    Bot: 12,
};
