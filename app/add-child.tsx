import React from "react";
import AddChildForm from "../components/AddChildForm";
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
            <AddChildForm />
        </Box>
    );
};

export default AddChildPage;
