import React from 'react';
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardContent from "../components/dashboard/DashboardContent";

const Dashboard = () =>
    <div id={"dashboard"}>
        <DashboardHeader/>
        <div id="dashboard-body">
          <DashboardNavbar/>
          <DashboardContent/>
        </div>
    </div>;


export default Dashboard;
