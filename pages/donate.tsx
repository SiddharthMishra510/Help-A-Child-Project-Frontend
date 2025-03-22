import { useRouter } from "next/router";
import React from "react";
import Donate from "../components/Donate";
import Link from "next/link";
import { Button, Box, Typography } from "@mui/material";

const DonationPage = () => {
    const router = useRouter();
    const { childId } = router.query;

    if (!childId || typeof childId !== "string") {
        return <Typography color="error">Invalid child ID</Typography>;
    }

    return (
        <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href="/">
                <Button variant="outlined" color="secondary">
                    Back to Home
                </Button>
            </Link>
            <Donate childId={childId} />
        </Box>
    );
};

export default DonationPage;
