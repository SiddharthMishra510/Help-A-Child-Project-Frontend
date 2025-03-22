import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import Carousel from "../components/Carousel";
import { Child } from "../types/child";
import DeleteAllButton from "../components/DeleteAllButton";

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
                    data.forEach(child => console.log("Child:", child));
                } else {
                    setError("No children found.");
                }
            })
            .catch((err) => setError(err.message));
    }, []);

    return (
        <Box sx={{ textAlign: "center", mt: 4, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Donate To Your Star ⭐ Child
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            {children.length === 0 && !error && <Typography>Loading...</Typography>}

            {children.length > 0 && (
                <Carousel>
                    {children.map((child) => (
                        <Card key={child.id} sx={{ minWidth: 275, p: 2, m: 1 }}>
                            <CardContent sx={{ p: 2 }}>
                                <Typography variant="h5">{child.name}</Typography>
                                <Typography variant="body2">ID: {child.id}</Typography>
                                <img
                                    src={child.photo}
                                    alt={child.name}
                                    onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/picsum/200/300")}
                                    style={{ maxWidth: "50%", height: "auto", borderRadius: "8px" }}
                                />
                                <Typography variant="body2">Career Goal: {child.careerGoal}</Typography>
                                <Typography variant="body2">Amount Donated: {child.amountDonated}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>
            )}

            <Box sx={{ mt: 18 }}>
                <Typography variant="h6" gutterBottom>
                    [Only For Admin]
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <Link href="/add-child">
                        <Button variant="contained" color="primary">
                            Add Child
                        </Button>
                    </Link>
                    <DeleteAllButton onDelete={() => console.log("Children deleted")} />
                </Box>
            </Box>

        </Box>
    );
}
