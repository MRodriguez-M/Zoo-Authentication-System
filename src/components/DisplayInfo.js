import React from "react";

//Display roles duties using validated credntials and duties array in MongoDB
const DisplayInfo = ({ user, onLogout }) => {
    return (
        <div>
            <h1>Role Duties</h1>
            <ol>
                { user.duties.map((d, i) => (
                <li>{d}</li>
                ))
                }
            </ol>
            <button aria-label="logout" onClick={onLogout}>Logout</button>
        </div>
    );
};
  
export default DisplayInfo;