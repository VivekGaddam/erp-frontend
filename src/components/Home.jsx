import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [semesterData, setSemesterData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/data", {
          username: "yourUsername",  // Replace with actual username
          password: "yourPassword",  // Replace with actual password
        });
        setAttendanceData(response.data);
        setSemesterData(response.data.semesterData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const getProgressBarColor = (percentage) => {
    const numPercent = parseFloat(percentage);
    if (numPercent >= 90) return "progress-green";
    if (numPercent >= 85) return "progress-yellow";
    if (numPercent >= 75) return "progress-orange";
    return "progress-red";
  };

  // Check if data is available
  if (!attendanceData || !semesterData) {
    return (
      <div className="no-data-container">
        <div className="no-data-message">
          Loading data...
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Title */}
      <h1 className="page-title">Attendance and Semester Data</h1>

      {/* Total Attendance Card */}
      <div className="card">
        <h2 className="card-title">Total Attendance</h2>
        <div className="card-body">
          <p>
            Classes Attended: {attendanceData.totalAttendance?.classesAttended} out of {attendanceData.totalAttendance?.classesHeld}
          </p>
          <p className="attendance-percentage">
            {attendanceData.totalAttendance?.attendancePercentage}%
          </p>
          <div className="progress-bar">
            <div
              className={`progress-fill ${getProgressBarColor(attendanceData.totalAttendance?.attendancePercentage)}`}
              style={{ width: `${attendanceData.totalAttendance?.attendancePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Semester Marks Card */}
      <div className="card mt-4">
        <h2 className="card-title">Semester Marks</h2>
        <div className="card-body">
          <p><strong>CGPA:</strong> {semesterData?.cgpa}</p>
          <p><strong>Credits Obtained:</strong> {semesterData?.creditsObtained}</p>
          <p><strong>Subjects Due:</strong> {semesterData?.subjectDue}</p>
        </div>
      </div>

      {/* Subject Attendance Cards */}
      <div className="subject-cards mt-4">
        {attendanceData?.attendanceData?.map((record, index) => (
          <div key={index} className="subject-card">
            <h3 className="subject-name">{record.subject}</h3>
            {record.faculty && (
              <p className="faculty-name">Faculty: {record.faculty}</p>
            )}
            <p>Classes Attended: {record.classesAttended} out of {record.classesHeld}</p>
            <p className="attendance-percentage">{record.attendancePercentage}%</p>
            <div className="progress-bar">
              <div
                className={`progress-fill ${getProgressBarColor(record.attendancePercentage)}`}
                style={{ width: `${record.attendancePercentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
