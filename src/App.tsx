import { useEffect } from "react";

import { AppLayout } from "./layouts";

const App = () => {
  useEffect(() => {
    const test = async () => {
      const res = await (await fetch("http://localhost:2233/groceries")).json();
      console.log(res);
    };
    test();
  });
  return <AppLayout />;
};

export default App;
