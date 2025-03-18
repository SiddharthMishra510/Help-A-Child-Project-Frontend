import * as fs from "fs";
import * as path from "path";

import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "data", "child.json");

const readData = () => {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
};

const writeData = (data: any) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const data = readData();
        return res.json(data);
    }

    if (req.method === "POST") {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "Message is required" });

        const data = readData();
        const newMessage = { id: Date.now().toString(), content };

        data.messages.push(newMessage);
        writeData(data);

        return res.json(newMessage);
    }

    res.status(405).json({ error: "Method not allowed" });
}
