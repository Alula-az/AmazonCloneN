import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Components/Utility/action.type";
import { auth } from "./Components/Utility/firbase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("User logged in:", authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        console.log("User logged out");
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return () => unsubscribe(); // Cleanup function to avoid memory leaks
  }, []); // ✅ Empty dependency array to prevent infinite loops

  return <Routing />;
}

export default App;
