import React from "react";
import { Avatar, Box, Group, Stack, Switch, Text, Title } from "@mantine/core";
import Image from "next/image";

type Props = {
  id: string;
  name: string;
  teamName: string;
  country: string;
  teamLogo: string;
  teamShortName: string;
  is_playing?: boolean;
  event_player_credit: number;
  player_stats_available?: boolean;
};

const PlayerView = ({
  teamLogo,
  teamName,
  name,
  event_player_credit,
  teamShortName,
  country,
}: Props) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
      })}
      py={"sm"}
      px={"md"}
    >
      <Group align={"center"} sx={{ width: "100%" }} position="apart">
        <Group align={"center"}>
          <Stack spacing={0} align="center">
            <Avatar size={"lg"} color="cyan" radius="xl">
              <Image
                loader={({ src }) => src}
                alt={teamName}
                src={teamLogo}
                width={40}
                height={30}
              />
            </Avatar>
            <Text size={"sm"}>{teamShortName}</Text>{" "}
          </Stack>
          <Stack spacing={0}>
            <Title order={2} size={"xl"}>
              {name}
            </Title>
            <Text size={"sm"}>{country}</Text>
          </Stack>
        </Group>
        <Text size={"xl"}>{event_player_credit}</Text>
      </Group>
    </Box>
  );
};

export default PlayerView;
