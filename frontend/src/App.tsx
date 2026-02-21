import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Workspace from "@/pages/Workspace";
import Datasets from "@/pages/Datasets";
import DatasetDetail from "@/pages/DatasetDetail";
import RunDetail from "@/pages/RunDetail";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* App Routes with Sidebar */}
        <Route element={<Layout />}>
          <Route path="/workspace/:sessionId" element={<Workspace />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/datasets/:datasetId" element={<DatasetDetail />} />
          <Route path="/runs/:runId" element={<RunDetail />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
