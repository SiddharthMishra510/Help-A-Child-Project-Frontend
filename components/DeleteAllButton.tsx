import React from "react";
import Button from "@mui/material/Button";

const DeleteAllButton = ({ onDelete }) => {
    const handleDeleteAll = async () => {
        if (!window.confirm("Are you sure you want to delete all children?")) return;

        try {
            const response = await fetch("http://localhost:3000/children", {
                method: "DELETE",
            });

            if (!response.ok) {
                console.error("Error Response:", response);
            }

            alert("All children deleted successfully!");
            if (onDelete) onDelete(); // Notify parent if needed
        } catch (error) {
            console.error("Error:", error);
            alert("Error deleting children");
        }
    };

    return (
        <Button variant="contained" color="error" onClick={handleDeleteAll}>
            Delete All Children
        </Button>
    );
};

export default DeleteAllButton;
