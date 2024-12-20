import React from "react";
import "./home.css";

const Home = ({ attendanceData }) => {
  // Check if attendanceData exists and is in the correct format
  if (!attendanceData) {
    return (
      <div className="no-data-container">
        <div className="no-data-message">No data available.</div>
      </div>
    );
  }

  const getProgressBarColor = (percentage) => {
    const numPercent = parseFloat(percentage);
    if (numPercent >= 90) return "progress-green";
    if (numPercent >= 85) return "progress-yellow";
    if (numPercent >= 75) return "progress-orange";
    return "progress-red";
  };

  const calculateRemainingLeaves = (attendancePercentage, totalClasses, attendedClasses) => {
    const minAttendance = 0.75; // Minimum attendance percentage
    const maxLeaves = Math.floor((1 - minAttendance) * totalClasses / minAttendance);
    const leavesTaken = totalClasses - attendedClasses;
    const remainingLeaves = maxLeaves - leavesTaken;
    return remainingLeaves;
  };

  return (
    <div className="home-container">
      {/* Title */}
      <h1 className="page-title">Student Data</h1>

      {/* Total Attendance Section */}
      {attendanceData.totalAttendance && (
        <div className="card">
          <h2 className="card-title">Total Attendance</h2>
          <div className="card-body">
            <p>
              Classes Attended: {attendanceData.totalAttendance.classesAttended} out of{" "}
              {attendanceData.totalAttendance.classesHeld}
            </p>
            <p className="attendance-percentage">
              {attendanceData.totalAttendance.attendancePercentage}%
            </p>
            <div className="progress-bar">
              <div
                className={`progress-fill ${getProgressBarColor(
                  attendanceData.totalAttendance.attendancePercentage
                )}`}
                style={{
                  width: `${attendanceData.totalAttendance.attendancePercentage}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Subject Attendance Section */}
      {attendanceData.attendanceData && (
        <div className="subject-cards">
          {attendanceData.attendanceData.map((record, index) => {
            const remainingLeaves = calculateRemainingLeaves(
              record.attendancePercentage,
              record.classesHeld,
              record.classesAttended
            );
            return (
              <div key={index} className="subject-card">
                <h3 className="subject-name">{record.subject}</h3>
                {record.faculty && (
                  <p className="faculty-name">Faculty: {record.faculty}</p>
                )}
                <p>
                  Classes Attended: {record.classesAttended} out of{" "}
                  {record.classesHeld}
                </p>
                <p className="attendance-percentage">
                  {record.attendancePercentage}%
                </p>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${getProgressBarColor(
                      record.attendancePercentage
                    )}`}
                    style={{
                      width: `${record.attendancePercentage}%`,
                    }}
                  />
                </div>
                <div className="remaining-leaves">
                  Remaining Leaves: {remainingLeaves}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Semester Marks Section */}
      {attendanceData.semMarksData && (
        <div className="sem-marks-section">
          <h2 className="section-title">Semester Marks</h2>
          <div className="sem-marks-table">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Internal Marks</th>
                  <th>External Marks</th>
                  <th>Total Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.semMarksData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.subject}</td>
                    <td>{record.internalMarks}</td>
                    <td>{record.externalMarks}</td>
                    <td>{record.totalMarks}</td>
                    <td>{record.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
