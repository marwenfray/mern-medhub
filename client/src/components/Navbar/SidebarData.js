import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as HIcons from 'react-icons/hi'
export const DoctorData = [
  {
    title: 'Patients',
    path: '/patients',
    icon: <FaIcons.FaStethoscope />,
    cName: 'nav-text'
  },
  {
    title: 'Appointments',
    path: '/appointments',
    icon: <AiIcons.AiOutlineCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'New Patient',
    path: '/addpatient',
    icon: <AiIcons.AiOutlinePlus />,
    cName: 'nav-text'
  },
  
];
export const AdminData=[

  {
    title:'Doctors',
    path:'/doctors',
    icon:<FaIcons.FaStethoscope />,
    cName:'nav-text'
  },
  {
    title:'New Doctor',
    path:'/adddoctor',
    icon: <AiIcons.AiOutlinePlus />,
    cName:'nav-text'
  }
]
export const PatientData=[
  {
    title:'Appointments',
    path:'/myappointments',
    icon:<AiIcons.AiOutlineCalendar />,
    cName: 'nav-text'
  },
  {
    title:'Reports',
    path:'/myreports',
    icon:<HIcons.HiOutlineDocumentReport/>,
    cName:'nav-text'
  }
]