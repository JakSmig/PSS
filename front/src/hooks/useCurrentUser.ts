import React, { useEffect } from "react";
import axios from "axios";
import shallow from "zustand/shallow";

import { User, useStore } from "./useStore";

export const useCurrentUser = () => {
  const { token, user, setUser } = useStore(
    (state) => ({ token: state.token, user: state.user, setUser: state.setUser }),
    shallow
  );

  useEffect(() => {
    (async () => {
      if (token) {
        const fetchedUser = await axios.get<User>(
          `http://localhost:8080/user/get/bysession?sessionToken=${token}`
        );
        if (fetchedUser.data) {
          setUser(fetchedUser.data);
        }
      }
    })();
  }, []);

  return {
    user,
  };
};
