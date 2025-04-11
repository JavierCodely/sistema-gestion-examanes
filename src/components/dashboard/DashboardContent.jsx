// DashboardContent.jsx
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { FaHome, FaBook, FaClipboardList } from 'react-icons/fa';
import StudentInfo from './StudentInfo';
import SubjectsTable from './SubjectsTable';
import WelcomeSection from './WelcomeSection';
import ExamsManagement from './ExamsManagement';

/**
 * Main content component that switches between tabs
 * Shows different content based on active tab selection
 */
const DashboardContent = ({
  activeTab,
  setActiveTab,
  studentData,
  subjects,
  registeredExams,
  availableExams,
  upcomingExams,
  onRegisterExam
}) => {
  return (
    <div className="content-wrapper">
      {/* Student information card is always visible */}
      {studentData && <StudentInfo student={studentData} className="student-info-card" />}
      
      {/* Tabs for desktop view */}
      <div className="desktop-tabs d-none d-lg-block">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="custom-tabs mb-4"
        >
          <Tab 
            eventKey="welcome" 
            title={
              <span>
                <FaHome className="me-1" /> Inicio
              </span>
            }
            className="tab-content"
          >
            <WelcomeSection upcomingExams={upcomingExams} />
          </Tab>
          <Tab 
            eventKey="subjects" 
            title={
              <span>
                <FaBook className="me-1" /> Mis Materias
              </span>
            }
            className="tab-content"
          >
            <SubjectsTable subjects={subjects} />
          </Tab>
          <Tab 
            eventKey="exams" 
            title={
              <span>
                <FaClipboardList className="me-1" /> Exámenes
              </span>
            }
            className="tab-content"
          >
            <ExamsManagement 
              registeredExams={registeredExams}
              availableExams={availableExams}
              onRegister={onRegisterExam}
            />
          </Tab>
        </Tabs>
      </div>

      {/* Content for mobile view - shows based on active tab */}
      <div className="mobile-content d-lg-none">
        {activeTab === 'welcome' && <WelcomeSection upcomingExams={upcomingExams} />}
        {activeTab === 'subjects' && <SubjectsTable subjects={subjects} />}
        {activeTab === 'exams' && (
          <ExamsManagement 
            registeredExams={registeredExams}
            availableExams={availableExams}
            onRegister={onRegisterExam}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardContent;