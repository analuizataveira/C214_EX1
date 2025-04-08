import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import { LoginForm } from './pages/LoginForm.tsx';
import { ScheduleList } from './pages/schedule/ScheduleList.tsx';
import { UserForm } from './pages/user/UserForm.tsx';
import { ScheduleForm } from './pages/schedule/ScheduleForm.tsx';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/schedulelist" element={<ScheduleList />} />
      <Route path="/createuser" element={<UserForm />} />
      <Route
        path="/createschedule"
        element={
          <ScheduleForm
            schedule={{
            professorName: "" ,
            dayOfService: "",
            serviceTime: "" ,
            period: "" ,
            room:0 , // Alterado para número
            building:1,  // Alterado para número
            id:0
            }}
            onSubmit={() => { }}
            onCancel={() => { }}

          />
        }
      />
    </Routes>
  </BrowserRouter>
);