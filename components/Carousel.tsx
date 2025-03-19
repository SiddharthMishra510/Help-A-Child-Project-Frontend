import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import React from "react";

interface CarouselProps {
    children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
    return (
        <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 4 }}>
            <Swiper pagination={{ clickable: true }} modules={[Pagination]} loop>
                {children.map((child, index) => (
                    <SwiperSlide key={index}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                            {child}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default Carousel;
