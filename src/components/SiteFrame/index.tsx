import { Box, useMediaQuery } from "@mui/material";
import type { FC, ReactNode } from "react";
import { Topo } from "../Topo";
import { NavBar } from "../NavBar";
import { BottomLocation } from "../BottomLocation";
import { BottomNavigation } from "../BottomNavigation";
import MobileNavbar from "../MobileNavbar";
import theme from "@/styles/theme";

export const SiteFrame: FC<{ children: ReactNode }> = ({ ...props }) => {
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <Box
      sx={{
        width: "100%",
        height: 100,
        display: "grid",
        background: (theme) => theme.palette.primary.light,
      }}
    >
      {!isMobile && <Topo />}
      {isMobile ? <MobileNavbar /> : <NavBar />}
      {props.children}
      <BottomLocation />
      <BottomNavigation />
    </Box>
  );
};
