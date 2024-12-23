import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './page/admin/AdminHome';
import StaffHome from './page/user/StaffHome';
import CmpAddStaff from './page/admin/CmpAddStaff';
import CmpAdminCollection from './page/admin/CmpAdminCollection';
import GetAll from './page/admin/GetAll';
import CmpStaffCollection from './page/user/CmpStaffCollection';
import CmpLogin from './page/CmpLogin';
import CmpStaffUpdate from './page/admin/CmpStaffUpdate'; // Ensure CmpStaffUpdate is imported
import CmpUserLogout from './page/admin/CmpUserLogout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes for admin */}
          <Route path='/admin' element={<AdminHome />}>
            <Route path="AddStaff" element={<CmpAddStaff />} />
            <Route path="AddCollection" element={<CmpAdminCollection />} />
            <Route path="getallStaff" element={<GetAll />} />
            
          </Route>

          {/* Routes for user */}
          <Route path='/user' element={<StaffHome />}>
            <Route path="StaffCollection" element={<CmpStaffCollection />} />
            
          </Route>

          {/* Login */}
          <Route path='/' element={<CmpLogin />} />

          {/* Staff Update Route */}
          <Route path='/CmpStaffUpdate/:staff_id' element={<CmpStaffUpdate />} /> {/* Fixed this line */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
