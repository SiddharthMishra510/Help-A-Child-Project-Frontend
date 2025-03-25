import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import Carousel from "../components/Carousel";
import { Child } from "../types/child";
import DeleteAllButton from "../components/DeleteAllButton";
import SearchBar from "../components/SearchBar";

export default function Home() {
    const [children, setChildren] = useState<Child[]>([]);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/");
    };

    const handleSearch = (query: string) => {
        setSearchTerm(query);
        // TODO: Query backend for search term for 'name' field
        console.log("Searching for:", query);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        // TODO: Make this conditional in the sense that:
        // If Searchterm, then fetch get children for searchterm Name
        // Else fetch get all children

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
    }, []); // TODO: Add Search term in the watchlist for this useEffect

    return (
        <Box sx={{ textAlign: "center", mt: 4, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Donate To Your Star ⭐ Child
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <>
                <h1>Search</h1>
                <SearchBar onSearch={handleSearch} />
                {searchTerm && <p>Results for: {searchTerm}</p>}
            </>

            {children.length === 0 && !error && <Typography>Loading...</Typography>}

            {children.length > 0 && (
                <Carousel>
                    {children.map((child) => (
                        <Card key={child.id} sx={{ minWidth: 275, p: 0, m: 1}}>
                            <CardContent sx={{ p: 2 }}>
                                <Typography variant="h5">{child.name}</Typography>
                                <img
                                    src={child.photo}
                                    alt={child.name}
                                    onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/picsum/200/300")}
                                    style={{ maxWidth: "50%", height: "auto", borderRadius: "8px" }}
                                />
                                <Typography variant="body2">Career Goal: {child.careerGoal}</Typography>
                                <Typography variant="body2">Donation Required: {child.donationRequired}</Typography>
                                <Typography variant="body2">Amount Donated: {child.amountDonated}</Typography>
                                <Link href={`/donate?childId=${child.id}`} passHref>
                                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Donate
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>
            )}

            <Box sx={{ mt: 5 }}>
                {isLoggedIn ? (
                    <>
                        <Box sx={{ mt: 5 }}>
                            <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                                <Link href="/add-child">
                                    <Button variant="contained" color="primary">Add Child</Button>
                                </Link>
                            </Box>
                            <Box sx={{ alignSelf: "flex-start" }}>
                                <DeleteAllButton onDelete={() => console.log("Children deleted")} />
                            </Box>
                        </Box>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="contained" color="primary" sx={{ mr: 2 }}>Admin Login</Button>
                        </Link>
                    </>
                )}
            </Box>
        </Box>
    );
}
