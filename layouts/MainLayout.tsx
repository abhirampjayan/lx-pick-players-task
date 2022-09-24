import React, { PropsWithChildren } from "react";
import NavBar from "../components/NavBar";
import { AppShell, Button } from "@mantine/core";


const MainLayout = ({children}: PropsWithChildren) => {
  return (
    <AppShell header={<NavBar />}>
      {children}
    </AppShell>
  );
};

export default MainLayout;
