import { Avatar, Box, Group, Stack, Switch, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSelectPlayers from "../hooks/useSelectPlayers";
import { togglePlayer } from "../store/slice/selectedPlayesSlice";
import { showNotification } from "@mantine/notifications";
import { RootState } from "../store/store";

type Props = {
  id: string;
  name: string;
  teamName: string;
  country: string;
  teamLogo: string;
  teamId: number;
  teamShortName: string;
  is_playing?: boolean;
  event_player_credit: number;
  block: boolean;
  player_stats_available?: boolean;
};

const PlayerCard = ({
  id,
  teamLogo,
  teamId,
  teamName,
  name,
  event_player_credit,
  teamShortName,
  block,
  country,
}: Props) => {
  const { selectedPlayers } = useSelectPlayers();
  const includes: boolean = selectedPlayers.includes(id);
  const dispatch = useDispatch();
  const credit = useSelector(
    (state: RootState) => state.selectedPlayers.credit
  );
  const teams = useSelector((state: RootState) => state.selectedPlayers.teams);
  const toggle = () => {
    if (selectedPlayers.length < 11) {
      if (block || credit < event_player_credit || teams[teamId] >= 7) {
        if (includes) {
          dispatch(togglePlayer(id));
        } else {
          if (teams[teamId] > 7) {
            showNotification({
              title: "Maximum Limit Reached",
              message: `Maximum 7 members are allowed to select from one team`,
              color: "yellow",
            });
          } else {
            showNotification({
              title: "Maximum Limit Reached",
              message: ``,
              color: "yellow",
            });
          }
        }
      } else {
        if (credit > event_player_credit) {
          dispatch(togglePlayer(id));
        } else {
          showNotification({
            title: "Credit Limit Run Over",
            message: "You don't have enough credit! 🤥",
            color: "red",
          });
        }
      }
    } else {
      if (includes) {
        dispatch(togglePlayer(id));
      } else {
        showNotification({
          title: "11 Players Selected",
          message: "You Already Selected 11 Players",
          color: "green",
        });
      }
    }
  };
  return (
    <Box
      key={id}
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
        background: `${includes ? theme.colors.green[9] : theme.colors.dark}`,
        "&:hover": { background: theme.colors.blue },
      })}
      py={"sm"}
      px={"md"}
      onClick={toggle}
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

export default PlayerCard;
