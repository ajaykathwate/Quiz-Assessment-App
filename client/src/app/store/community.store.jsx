import produce from "immer";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const useCommunityStore = create(
  persist(
    devtools(
      (set) => ({
        communities: [],
        addCommunity: (community) => {
          set(
            produce((state) => {
              // state.communities.push(community);
              state.communities = [state.communities, community];
            }),
            false,
            "communities/addCommunity"
          );
        },
        deleteCommunity: (id) =>
          set(
            produce((state) => {
              // state.communities = state.communities.filter(
              //   (community) => community._id !== id
              // );
              state.communities = state.communities.filter((c) => c._id !== id);
            }),
            false,
            "communities/deleteCommunity"
          ),
      }),

      { name: "communities", serialize: true }
    ),
    {
      name: "communities", // unique name
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

export default useCommunityStore;
