import React from "react";
import AccountCreate from "./scenes/Account/AccountCreate";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AccountCreate />
    </div>
  );
};

export default App;
