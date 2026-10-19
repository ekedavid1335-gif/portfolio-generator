import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./AppLayout";
import UserDashboard from "./UserDashboard";
import Settings from "./Settings";
import MyPortfolios from "./MyPortfolios";
import Templates from "./Templates";
import CreatePortfolio from "./CreatePortfolio";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-portfolios" element={<MyPortfolios />} />
          <Route path="/templates" element={<Templates />} />
          <Route
            path="/create-portfolio"
            element={<CreatePortfolio />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}