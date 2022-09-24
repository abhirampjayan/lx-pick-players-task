import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerType } from "../../types/playerType";

export interface PlayersList {
  list: PlayerType[];
  credit: number;
  selected: string[];
  teamRoleCount: {
    batsman: number;
    bowler: number;
    wk: number;
    allRounder: number;
  };
  teams: {
    [team: string]: number;
  };
}

const initialState: PlayersList = {
  list: [],
  credit: 100,
  selected: [],
  teamRoleCount: { batsman: 0, bowler: 0, wk: 0, allRounder: 0 },
  teams: {},
};

export const selectedPlayersSlice = createSlice({
  name: "selectedPlayes",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<PlayerType[]>) => {
      state.list = action.payload;
    },
    togglePlayer: (state, action: PayloadAction<string>) => {
      const player = state.list?.filter(
        (item) => action.payload === item.player_id
      )[0];
      if (state.selected.includes(player.player_id)) {
        state.selected = state.selected?.filter(
          (item) => item !== player.player_id
        );
        state.credit = state.credit + player.event_player_credit;
        if (!state.teams[player.team_id])
          state.teams = { ...state.teams, [player.team_id]: 0 };
        else
          state.teams = {
            ...state.teams,
            [player.team_id]:
              state.teams[player.team_id] === 0
                ? 0
                : state.teams[player.team_id] - 1,
          };
        switch (player.role) {
          case "All-Rounder":
            state.teamRoleCount.allRounder > 0 &&
              state.teamRoleCount.allRounder--;
            break;
          case "Batsman":
            state.teamRoleCount.batsman > 0 && state.teamRoleCount.batsman--;
            break;
          case "Bowler":
            state.teamRoleCount.bowler > 0 && state.teamRoleCount.bowler--;
            break;
          case "Wicket-Keeper":
            state.teamRoleCount.wk > 0 && state.teamRoleCount.wk--;
            break;
          default:
            break;
        }
      } else {
        state.selected = [...state.selected, player.player_id];
        state.credit = state.credit - player.event_player_credit;
        if (!state.teams[player.team_id])
          state.teams = { ...state.teams, [player.team_id]: 1 };
        else
          state.teams = {
            ...state.teams,
            [player.team_id]: state.teams[player.team_id] + 1,
          };
        switch (player.role) {
          case "All-Rounder":
            state.teamRoleCount.allRounder++;
            break;
          case "Batsman":
            state.teamRoleCount.batsman++;
            break;
          case "Bowler":
            state.teamRoleCount.bowler++;
            break;
          case "Wicket-Keeper":
            state.teamRoleCount.wk++;
            break;
          default:
            break;
        }
      }
    },
  },
});

export const { togglePlayer, setList } = selectedPlayersSlice.actions;

export default selectedPlayersSlice.reducer;
