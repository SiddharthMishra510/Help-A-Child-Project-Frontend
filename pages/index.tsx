import { useEffect, useState } from "react";

export default function ChildProfile() {
    const [child, setChild] = useState<any>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/child")
            .then((res) => res.json())
            .then(setChild);
    }, []);

    const sendMessage = async () => {
        if (!message) return;
        await fetch("/api/child", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: message }),
        });
        setMessage("");
        fetch("/api/child").then((res) => res.json()).then(setChild);
    };

    if (!child) return <p>Loading...</p>;

    return (
        <div>
            <h1>{child.name}</h1>
            <img src={child.photo} alt={"photo"} />

            <h2>Messages</h2>
            <ul>
                {child.messages.map((msg: any) => (
                    <li key={msg.id}>{msg.content}</li>
                ))}
            </ul>

            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
            ></textarea>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
