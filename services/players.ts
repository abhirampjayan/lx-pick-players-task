import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PlayerType } from "../types/playerType";

export const playersListApi = createApi({
  reducerPath: "playersListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://leaguex.s3.ap-south-1.amazonaws.com/",
  }),
  endpoints: (builder) => ({
    getPlayersList: builder.query<PlayerType[], string>({
      query: () => `task/fantasy-sports/Get_All_Players_of_match.json`,
    }),
  }),
});
export const { useGetPlayersListQuery } = playersListApi;
