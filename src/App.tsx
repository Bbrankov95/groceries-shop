import { CartContextProvider } from "contexts";

import { AppLayout } from "./layouts";

const App = () => {
  return (
    <CartContextProvider>
      <AppLayout />
    </CartContextProvider>
  );
};

export default App;
