import { Box, Title, ScrollArea } from "@mantine/core";
import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { PlayerType } from "../types/playerType";
import PlayerCard from "./PlayerCard";

type Props = {
  data: PlayerType[];
  title: string;
  limit: number[];
  role: string;
};

const PlayersByRole = ({ data, title, limit, role: propsRole }: Props) => {
  const teamRoleCount = useSelector(
    (state: RootState) => state.selectedPlayers.teamRoleCount
  );

  const [role, setRole] = useState(0);
  useEffect(() => {
    switch (propsRole) {
      case "All-Rounder":
        setRole(teamRoleCount.allRounder);
        break;
      case "Batsman":
        setRole(teamRoleCount.batsman);
        break;
      case "Bowler":
        setRole(teamRoleCount.bowler);
        break;
      case "Wicket-Keeper":
        setRole(teamRoleCount.wk);
        break;
      default:
        setRole(0);
    }
  }, [
    propsRole,
    teamRoleCount.allRounder,
    teamRoleCount.batsman,
    teamRoleCount.bowler,
    teamRoleCount.wk,
  ]);

  return (
    <Box>
      <Title order={2} color="grey[1]" my={"lg"}>
        {title}
      </Title>
      <ScrollArea
        sx={(theme) => ({
          border: `1px solid ${theme.colors.gray[7]}`,
          borderRadius: theme.radius.md,
          height: "280px",
        })}
      >
        {data?.map(
          ({
            name,
            country,
            player_id,
            team_short_name,
            team_name,
            team_logo,
            event_player_credit,
            team_id,
          }) => (
            <PlayerCard
              key={player_id}
              event_player_credit={event_player_credit}
              id={player_id}
              name={name}
              country={country}
              teamShortName={team_short_name}
              teamName={team_name}
              teamLogo={team_logo}
              block={role >= limit[1]}
              teamId={team_id}
            />
          )
        )}
      </ScrollArea>
    </Box>
  );
};

export default PlayersByRole;
