"use client";

import { useEffect } from "react";

const ModelDashboardPage = () => {
  useEffect(() => {
    document.title = "Dashboard - Models";
  }, []);

  return <div>Models</div>;
};

export default ModelDashboardPage;
