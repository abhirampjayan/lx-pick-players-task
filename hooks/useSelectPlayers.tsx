import { useMemo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPlayersListQuery } from "../services/players";
import { setList } from "../store/slice/selectedPlayesSlice";
import { RootState } from "../store/store";

const useSelectPlayers = () => {
  const { data, error, isLoading } = useGetPlayersListQuery("");
  //   const [validate, setValidate] = useState(false);
  const selectedPlayers = useSelector(
    (state: RootState) => state.selectedPlayers.selected
  );
  const teamRoleCount = useSelector(
    (state: RootState) => state.selectedPlayers.teamRoleCount
  );
  const dispatch = useDispatch();
  const playersData = useMemo(() => {
    if (data) {
      return [
        {
          role: "Batsman",
          list: data.filter((item) => item.role === "Batsman"),
          title: "Pick 3-7 Batsman",
          limit: [3, 7],
        },
        {
          role: "Wicket-Keeper",
          list: data.filter((item) => item.role === "Wicket-Keeper"),
          title: "Pick 1-5 Wicket Keepers",
          limit: [1, 5],
        },
        {
          role: "Bowler",
          list: data.filter((item) => item.role === "Bowler"),
          title: "Pick 3-7 Bowlers",
          limit: [3 - 7],
        },
        {
          role: "All-Rounder",
          list: data.filter((item) => item.role === "All-Rounder"),
          title: "Pick 3-7 All Rounders",
          limit: [0, 4],
        },
      ];
    }
  }, [data]);
  const validate = () => {
    if (0 > teamRoleCount.allRounder)
      return { status: false, message: "Select At Least 0 All-Rounders" };
    if (3 > teamRoleCount.batsman)
      return { status: false, message: "Select At Least 3 Batsman" };
    if (3 > teamRoleCount.bowler)
      return { status: false, message: "Select At Least 3 Bowlers" };
    if (1 > teamRoleCount.wk)
      return { status: false, message: "Select At Least 1 Wicket-Keeper" };
    return { status: true, message: "Select At Least 1 Wicket-Keeper" };
  };

  useEffect(() => {
    if (data) {
      dispatch(setList(data));
    }
    return () => {};
  }, [data, dispatch]);

  return {
    isLoading,
    playersData,
    selectedPlayers,
    validate,
    data,
    teamRoleCount,
  };
};

export default useSelectPlayers;
