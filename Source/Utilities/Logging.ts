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
 * Logging class for logging messages to the console with user-defined log levels.
 *
 * ```typescript
 * const Log = new Logging(1);
 * Log.Log("This is a debug message.", "Debug");
 * Log.Log("This is an info message.", "Info");
 * Log.Log("This is a warning message.", "Warning");
 * Log.Log("This is an error message.", "Error");
 * ```
 *
 * All of the above log messages will be logged to the console. The log level is set to 1 (Debug), so all messages will be logged.
 * If the log level was set to 2 (Info), only the info, warning, and error messages would be logged.
 *
 * @class Logging
 * @constructor Defines the log level. Defaults to 2 (Info).
 * @method Log Logs a message to the console with the specified log level. Will only log messages with a log level equal to or higher than the current log level.
 * @method Debug Logs a debug message to the console.
 * @method Info Logs an info message to the console.
 * @method Warning Logs a warning message to the console.
 * @method Error Logs an error message to the console.
 * @property LogLevel The log level. Defaults to 2 (Info).
 */

export class Logging {
    /**
     * The log level.
     *
     * @type {1 | 2 | 3 | 4}
     * @default 2
     */

    public LogLevel: 1 | 2 | 3 | 4;

    private Colors = {
        Reset: "\x1b[0m",
        Dim: "\x1b[2m",
        FgRed: "\x1b[31m",
        FgYellow: "\x1b[33m",
        FgBlue: "\x1b[34m",
    };

    private LogLevels: {
        [key in "Debug" | "Info" | "Warning" | "Error"]: {
            Level: number;
            Color: string;
        };
    } = {
        Debug: {
            Level: 1,
            Color: this.Colors.Dim,
        },
        Info: {
            Level: 2,
            Color: this.Colors.FgBlue,
        },
        Warning: {
            Level: 3,
            Color: this.Colors.FgYellow,
        },
        Error: {
            Level: 4,
            Color: this.Colors.FgRed,
        },
    };

    /**
     * Constructor for the Logging class.
     *
     * @param {1 | 2 | 3 | 4} [logLevel=2] The log level. Defaults to 2.
     * @returns {void}
     */

    constructor(logLevel?: 1 | 2 | 3 | 4) {
        this.LogLevel = logLevel || 2;
    }

    /**
     * Logs a message to the console with the specified log level.
     *
     * @param {string} message The message to log.
     * @param {"Debug" | "Info" | "Warning" | "Error"} level The log level.
     * @returns {void}
     */

    public Log(message: string, level: "Debug" | "Info" | "Warning" | "Error") {
        if (this.LogLevels[level].Level >= this.LogLevel) {
            const logLevel = this.LogLevels[level];
            const timestamp = new Date().toISOString();

            console.log(`${logLevel.Color}[${level.toUpperCase()}]${this.Colors.Reset} (${timestamp}): ${message}`);
        }
    }

    public Debug(message: string) {
        this.Log(message, "Debug");
    }

    public Info(message: string) {
        this.Log(message, "Info");
    }

    public Warning(message: string) {
        this.Log(message, "Warning");
    }

    public Error(message: string) {
        this.Log(message, "Error");
    }
}
