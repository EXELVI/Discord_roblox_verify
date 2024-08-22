# 🤖 Discord Roblox Verification System

![Repo Size](https://img.shields.io/github/repo-size/EXELVI/Discord_roblox_verify?style=for-the-badge)
![License](https://img.shields.io/github/license/EXELVI/Discord_roblox_verify?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-14.x%20or%20higher-green?style=for-the-badge)
![Discord.js](https://img.shields.io/badge/Discord.js-v14-blue?style=for-the-badge)

## 🌟 Introduction

This project is a **Discord bot** integrated with **Roblox** for verifying users. The bot allows users to link their Discord accounts with their Roblox profiles through an in-game experience, ensuring that only verified users can access certain roles or commands on your server.

## 🛠️ Features

- **User Verification**: Authenticate Discord users by verifying their Roblox accounts.
- **Seamless Integration**: Automatically update user roles upon successful verification.
- **Custom Commands**: Easily extend the bot with custom commands.
- **Secure Communication**: Utilizes HTTPS for secure API communication between Discord and Roblox.

## 🚀 Getting Started

### 📦 Prerequisites

- **Node.js**: v14.x or higher
- A mongoDB database
- A Roblox account
- A Discord bot token

### 🚧 Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/EXELVI/Discord_roblox_verify.git
    cd Discord_roblox_verify
    ```

2. Install the dependencies:

    If you use [pnpm](https://pnpm.io/):

    ```bash
    pnpm install
    ```

    else:
    
        ```bash
        npm install
        ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    token=YOUR_DISCORD_BOT_TOKEN
    mongodb=YOUR_MONGODB_URI
    ```
4. Follow the instructions in the [Roblox Configuration](#🛠️-roblox-configuration) and [Discord Configuration](#🤖-discord-configuration) sections.

5. Start the bot:

    ```bash
    node index.js
    ```

### 🛠️ Roblox Configuration
1. Create a new place in Roblox Studio.
2. Add a `ScreenGui` object to the `StarterGui` structured as follows:

    ```plaintext
    ScreenGui
    ├── Frame
    │   └── UICorner 
    ├── TextLabel (If you can read this it means that the verify didn't go well)
    ├── TextButton (Close)
    └── Script (scriptgui.lua)
    ```
3. Insert the `join.lua` and `scriptgui.lua` scripts into the place.

### 🤖 Discord Configuration

1. Create a new Discord bot at the [Discord Developer Portal](https://discord.com/developers/applications).
2. Add the bot to your server.
3. Enable intents for the bot
4. Copy the bot token and add it to the `.env` file.
5. Create a new role for verified users and copy the role ID.
6. Change `587945307908603916` with your server ID and `1268991912409301002` with the role ID in the `index.js` file.
7. Start the bot and verify that the bot is online.


## 📂 Project Structure

```bash
├── commands
│   └── general
│       └── ping.js
├── events
│   ├── general
│   │   └── ready.js
│   └── verify
│       └── interactionCreate.js
├── robloxScripts
│   ├── join.lua
│   └── scriptgui.lua
├── .env
├── .gitattributes
├── .gitignore
├── client.js
├── db.js
├── index.js
├── localhost.crt
├── localhost.key
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any improvements to suggest.

