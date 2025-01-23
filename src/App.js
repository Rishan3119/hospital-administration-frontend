import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';
import Signup from './components/Signup';
import SignupPharm from './components/SignupPharm';
import Login from './components/Login';
import AdminHome from './components/AdminHome';
import DoctorHome from './components/Doctor/DoctorHome';
import PharmHome from './components/Pharmacist/PharmHome';
import AddPatient from './components/AddPatient';
import Appointment from './components/Appointment';
import AllPatients from './components/AllPatients';
import AllAppointments from './components/AllAppointments';
import SingleD from './components/SingleD';
import UpdateDep from './components/UpdateDep';
import AddDepartment from './components/AddDepartment';
import ViewAppointment from './components/Doctor/ViewAppointment';
import UpdateAppointment from './components/Doctor/UpdateAppointment';
import AddPrescription from './components/Doctor/AddPrescription';
import ViewConsultnHistory from './components/Doctor/ViewConsultnHistory';
import ViewPrescription from './components/Doctor/ViewPrescription';
import RecentPr from './components/Pharmacist/RecentPr';
import AllPrescriptionHistory from './components/Pharmacist/AllPrescriptionHistory';
import AddSinglePres from './components/Doctor/AddSinglePres';
import ChangePassword from './components/Doctor/ChangePassword';
import ChangePasswordP from './components/Pharmacist/ChangePasswordP';
import AllPrHistoryD from './components/Doctor/AllPrHistoryD';
import AllPr from './components/Pharmacist/AllPr';
import UpdateProfile from './components/Pharmacist/UpdateProfileP';
import UpdateProfileD from './components/Doctor/UpdateProfileD';
import UpdateAdmin from './components/UpdateAdmin';

function App() {
  localStorage.setItem('baseUrl','https://hospitaladministration.onrender.com')
  

  return (
    <div className="App">
      <ToastContainer/>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/signupP' element={<SignupPharm/>} />
            <Route path='/login' element={<Login/>} />

            {/* Reception routing */}
            <Route path='/AH' element={<AdminHome/>} />
            <Route path='/addPatient' element={<AddPatient/>} />
            <Route path='/allPatients' element={<AllPatients/>} />
            <Route path='/appointment' element={<Appointment/>} />
            <Route path='/allAppointment' element={<AllAppointments/>} />
            <Route path='/AddDep' element={<AddDepartment/>} />
            <Route path='/SDep/:id' element={<SingleD/>} />
            <Route path='/UDep/:id' element={<UpdateDep/>} />
            <Route path='/changepassA' element={<ChangePasswordP/>} />
            <Route path='/updateA/:id' element={<UpdateAdmin/>} />


            {/* doctor routing */}
            <Route path='/DH' element={<DoctorHome/>} />
            <Route path='/viewAppo' element={<ViewAppointment/>} />
            <Route path='/UAppo/:id' element={<UpdateAppointment/>} />
            <Route path='/addPresc' element={<AddPrescription/>} />
            <Route path='/addPresc/:id' element={<AddSinglePres/>} />
            <Route path='/viewHistory' element={<ViewConsultnHistory/>} />
            <Route path='/viewPr/:patientId' element={<ViewPrescription/>} />
            <Route path='/changepass' element={<ChangePassword/>} />
            <Route path='/allprhistoryD/:id' element={<AllPrHistoryD/>} />
            <Route path='/updateD/:id' element={<UpdateProfileD/>} />



            {/* Pharmacist routing */}
            <Route path='/PH' element={<PharmHome/>} />
            <Route path='/recentPr' element={<RecentPr/>} />
            <Route path='/allprhistory/:id' element={<AllPrescriptionHistory/>} />
            <Route path='/changepassP' element={<ChangePasswordP/>} />
            <Route path='/allPr' element={<AllPr/>} />
            <Route path='/updateP/:id' element={<UpdateProfile/>} />

            

          </Routes>
        </Router>
    </div>
  );
}

export default App;
