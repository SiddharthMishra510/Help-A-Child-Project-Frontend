import { useEffect, useState } from "react";

// Define the Child interface
export interface Child {
    id: number;
    name: string;
}

export default function ChildProfile() {
    const [child, setChild] = useState<Child | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/children")
            .then((res): Promise<Child[]> => {
                if (!res.ok) throw new Error("Failed to fetch children");
                return res.json();
            })
            .then((children: Child[]) => {
                if (children.length > 0) {
                    setChild(children[0]);
                } else {
                    setError("No children found.");
                }
            })
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!child) return <p>Loading...</p>;

    return (
        <div>
            <h1>{child.name}</h1>

            <h2>Messages</h2>
            <ul>
                <li>{child.id}</li>  {/* ✅ Fix: Wrap id in <li> */}
            </ul>
        </div>
    );
}
