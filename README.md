<div align="center">
    <h1>Callisto 🌙</h1>
    <img src=".github/logo.png" width="200">
    <br>
    <b>This is what I think Callisto would look like. Made using <a href="https://deno.com">Deno's Dinosaur Creator.</a></b>
    <hr>
    <p>Check out <a href="https://github.com/nin0chat/Callisto/blob/main/Releases.md">Releases.md</a> for more information on <b>v0.1.1</b>!</p>
</div>

---

Callisto (getting it's name from Jupiter's second largest moon) is a simple, easy-to-use, and powerful Deno V2 library for creating and managing nin0chat bots. It only uses the `ws` library, everything else is built from scratch.

## Installation 📦

The installation is very simple, just run the following command in your terminal:

```bash
deno add jsr:@nin0chat/callisto
```

## Usage 📚

Here is a simple example of how to use Callisto:

```ts
import { Client, Callisto } from "@nin0chat/callisto";

const client = new Client({
    Bot: {
        username: "YOUR_BOT_NAME",
        key: "YOUR_BOT_KEY",
        staleMessages: [],
    },
    Websocket: {
        URI: "wss://guhws.nin0.dev", // If you're using a different server, change this.
        Reconnect: true,
        ReconnectMaxTrials: 5,
    },
    LogLevel: 2,
});

const Log = client.Logger;

// This event is called when the bot connects to the server.
client.On("open", () => {
    Log.Info("Connected to the server!");
    client.Send("Hello, world!");
});

// This event is called when the bot receives a message.
client.On("message", (message: Callisto.Message) => {
    // This is a simple example of how to check if the message is from a bot.
    if (message.isBot()) return;

    Log.Info("New message! " + message.content + " - " + message.username);
});

// Always put this at the end of your code (after you've registered all your events).
client.Connect();
```

Was this not enough? It's okay! We have a more in-depth example [here](https://github.com/nin0chat/Callisto/tree/main/Example).

## Documentation 📖

~~The documentation for Callisto can be found [here](https://github.com/nin0chat/Callisto/tree/main/Documentation).~~ There will be no documentation as of yet until the nin0chat rewrite is complete. Check out the [example](https://github.com/nin0chat/Callisto/tree/main/Example) or look at the JSDoc comments in the source code.

## License 📜

This project is licensed under the GNU General Public License v3.0. You can find the license [here](https://github.com/nin0chat/Callisto/blob/main/LICENSE).
