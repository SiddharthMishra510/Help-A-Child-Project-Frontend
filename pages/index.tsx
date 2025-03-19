import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import Carousel from "../components/Carousel";
import { Child } from "../types/child";

export default function Home() {
    const [children, setChildren] = useState<Child[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/children`)
            .then((res): Promise<Child[]> => {
                if (!res.ok) throw new Error("Failed to fetch children");
                return res.json();
            })
            .then((data: Child[]) => {
                if (data.length > 0) {
                    setChildren(data);
                } else {
                    setError("No children found.");
                }
            })
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (children.length === 0) return <p>Loading...</p>;

    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Donate To Your Star ⭐ Child
            </Typography>

            <Link href="/add-child">
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                    Add Child
                </Button>
            </Link>

            <Carousel>
                {children.map((child) => (
                    <Card key={child.id} sx={{ minWidth: 275, textAlign: "center", p: 2 }}>
                        <CardContent>
                            <Typography variant="h5">{child.name}</Typography>
                            <Typography variant="body2">ID: {child.id}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Carousel>
        </Box>
    );
}
