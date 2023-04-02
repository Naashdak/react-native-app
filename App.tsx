import React from "react";
import RootNavigator from "./src/core/navigation/RootNavigator";
import container, { ContainerContext } from "./src/core/di/Inversify.config";

export default function App() {

  return (
    <ContainerContext.Provider value={container}>
      <RootNavigator />
    </ContainerContext.Provider>
  );
}