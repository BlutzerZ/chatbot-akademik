"use client";

import { useEffect } from "react";

const LogsDashboardPage = () => {
  useEffect(() => {
    document.title = "Dashboard - Logs";
  }, []);

  return <div>Logs</div>;
};

export default LogsDashboardPage;
