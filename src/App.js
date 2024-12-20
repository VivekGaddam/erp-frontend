
import "@fortawesome/fontawesome-free/css/all.min.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
    const [attendanceData, setAttendanceData] = useState(null);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Login setAttendanceData={setAttendanceData} />}
                />
                <Route
                    path="/home"
                    element={<Home attendanceData={attendanceData} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
