import {
  Container,
  Button,
  LoadingOverlay,
  SimpleGrid,
  Group,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import PlayersByRole from "../components/PlayersByRole";
import useSelectPlayers from "../hooks/useSelectPlayers";

const Home: NextPage = () => {
  const route = useRouter();
  const { isLoading, playersData, selectedPlayers, validate } =
    useSelectPlayers();
  return (
    <>
      <Head>
        <title>Pick Player Task</title>
        <meta name="description" content="Task by LeagueX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container mt="80px" size="lg">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <SimpleGrid
          breakpoints={[
            { minWidth: "xs", cols: 1 },
            { minWidth: "sm", cols: 2 },
          ]}
        >
          {playersData &&
            playersData.map((item, index) => (
              <PlayersByRole
                data={item.list}
                title={item.title}
                role={item.role}
                limit={item.limit}
                key={index}
              />
            ))}
        </SimpleGrid>
        <Group py="lg" position={"apart"}>
          <Title order={2}>{selectedPlayers.length}/11</Title>
          <Button
            disabled={selectedPlayers.length === 11 ? false : true}
            onClick={() => {
              validate().status
                ? route.replace("/final")
                : showNotification({
                    title: "Validation Failled",
                    message: validate().message,
                    color: "red",
                  });
            }}
          >
            Create Team
          </Button>
        </Group>
      </Container>
    </>
  );
};

export default Home;
