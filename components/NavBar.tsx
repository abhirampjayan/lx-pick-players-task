import React from "react";
import { Header, Container, Box, Title, Button, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {};

const NavBar = (props: Props) => {
  const credit = useSelector(
    (state: RootState) => state.selectedPlayers.credit
  );
  return (
    <Header height={"70px"}>
      <Container
        size={"lg"}
        sx={{
          alignItems: "center",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Title order={1} color="blue">
            Pick <span style={{ color: "#82C91E" }}>Player</span> Task
          </Title>
        </Box>
        <Title order={3} color="lime.4">
          Credit : {credit}
        </Title>
      </Container>
    </Header>
  );
};

export default NavBar;
