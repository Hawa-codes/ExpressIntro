const fs = require("node:fs/promises");

const readUsers = async () => {
    const data = await fs.readFile("./data/users.json", "utf-8");
    return JSON.parse(data).users;
}

const saveUsers = async (users) => {
    await fs.writeFile("./data/users.json", JSON.stringify({ users }, null, 2));
}

module.exports = { readUsers, saveUsers };