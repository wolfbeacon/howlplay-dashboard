import React from 'react';
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardContent from "../components/dashboard/DashboardContent";

const Dashboard = () =>
    <div className={"page"} id={"dashboard"}>
        <DashboardHeader/>
        <DashboardNavbar/>
        <DashboardContent/>
    </div>;


export default Dashboard;
