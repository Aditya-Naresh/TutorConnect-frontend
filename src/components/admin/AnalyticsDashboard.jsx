import React, { useEffect, useState } from "react";
import AnalyticsCard from "./AnalyticsCard";
import { Users, UserCheck, GraduationCap, Clock, CheckCircle } from "lucide-react";
import { WEBSOCKETSERVER } from "../../server";
import { useSelector } from "react-redux";

const AnalyticsDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTutors, setTotalTutors] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [ongoingSessions, setOngoingSessions] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const {access} = useSelector(state => state.auth)
  useEffect(() => {
    const socket = new WebSocket(`${WEBSOCKETSERVER}/analytics/?token=${access}`);
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTotalUsers(data.totalUsers);
      setTotalTutors(data.totalTutors);
      setTotalStudents(data.totalStudents);
      setOngoingSessions(data.ongoingSessions);
      setCompletedSessions(data.completedSessions);
    };
  
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  
    return () => {
      socket.close();
    };
  }, []);
  

  return (
    <div className="space-y-8">
      {/* First row: 3 cards */}
      <div className="flex justify-center gap-8">
        <AnalyticsCard
          title="Total Users"
          value={totalUsers}
          icon={<Users size={40} />}
          color="blue"
        />
        <AnalyticsCard
          title="Total Tutors"
          value={totalTutors}
          icon={<UserCheck size={40} />}
          color="green"
        />
        <AnalyticsCard
          title="Total Students"
          value={totalStudents}
          icon={<GraduationCap size={40} />}
          color="yellow"
        />
      </div>

      {/* Second row: 2 cards */}
      <div className="flex justify-center gap-8">
        <AnalyticsCard
          title="Ongoing Sessions"
          value={ongoingSessions}
          icon={<Clock size={40} />}
          color="purple"
        />
        <AnalyticsCard
          title="Completed Sessions"
          value={completedSessions}
          icon={<CheckCircle size={40} />}
          color="red"
        />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
