"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import DonateForm from "../components/DonateForm";
import Link from "next/link";
import { Button, Box, Typography } from "@mui/material";

const DonationPage = () => {
    const searchParams = useSearchParams();
    const childId = searchParams.get("childId");

    if (!childId) {
        return <Typography color="error">Invalid child ID</Typography>;
    }

    return (
        <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href="/">
                <Button variant="outlined" color="secondary">
                    Back to Home
                </Button>
            </Link>
            <DonateForm childId={childId} />
        </Box>
    );
};

export default DonationPage;
