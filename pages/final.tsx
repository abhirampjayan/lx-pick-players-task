import { useEffect } from "react";
import { Container, SimpleGrid, Title, Box } from "@mantine/core";
import useSelectPlayers from "../hooks/useSelectPlayers";
import PlayerView from "../components/PlayerView";
import { useRouter } from "next/router";
type Props = {};

const Final = (props: Props) => {
  const { isLoading, data, selectedPlayers } = useSelectPlayers();
  const route = useRouter();
  useEffect(() => {
    selectedPlayers.length !== 11 && route.replace("/");
    return () => {};
  }, [route, selectedPlayers.length]);

  return (
    <Container size={"lg"}>
      <Box mt="80px">
        <Title order={2} color="grey[1]" my={"lg"}>
          Your Team
        </Title>
      </Box>

      <SimpleGrid
        breakpoints={[
          { minWidth: "xs", cols: 1 },
          { minWidth: "sm", cols: 2 },
        ]}
      >
        {data
          ?.filter((item) => selectedPlayers.includes(item.player_id))
          .map((item) => (
            <PlayerView
              key={item.player_id}
              event_player_credit={item.event_player_credit}
              id={item.player_id}
              name={item.name}
              country={item.country}
              teamShortName={item.team_short_name}
              teamName={item.team_name}
              teamLogo={item.team_logo}
            />
          ))}
      </SimpleGrid>
    </Container>
  );
};

export default Final;
