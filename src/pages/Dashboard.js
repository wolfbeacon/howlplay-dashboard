import React from 'react';
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardModal from "../components/dashboard/DashboardModal";

const Dashboard = () =>
    <div id={"dashboard"}>
        <DashboardHeader/>
        <div id="dashboard-body">
          <DashboardNavbar/>
          <DashboardContent/>
        </div>
        <DashboardModal/>
    </div>;


export default Dashboard;
