import React from "react";
import AddChild from "../components/AddChild";
import Link from "next/link";
import { Button, Box } from "@mui/material";

const AddChildPage = () => {
    return (
        <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href="/">
                <Button variant="outlined" color="secondary">
                    Back to Home
                </Button>
            </Link>
            <AddChild />
        </Box>
    );
};

export default AddChildPage;
