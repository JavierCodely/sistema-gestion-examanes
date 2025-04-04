// src/services/mockData.js
export const mockStudentInfo = {
    name: "Lisandro Recalde",
    career: "Tecnicatura en Tecnología de la Información",
    dni: "12345678",
    average: 8.5,
    approvedSubjects: 20,
    currentSubjects: 5
  };
  
  export const mockSubjects = [
    { name: "Programación II", grade: 8.5, status: "Promoción" },
    { name: "Base de Datos", grade: 6.2, status: "Regular" },
    { name: "Sistemas Operativos", grade: 7, status: "Promoción" },
    { name: "Matemática II", grade: 3.5, status: "Insuficiente" },
    { name: "Estadística", grade: 5, status: "Regular" }
  ];
  
  export const mockExams = {
    registered: [
      { subject: "Física I", date: "9/5/2025", type: "Final" },
      { subject: "Matemática I", date: "14/5/2025", type: "Final" }
    ],
    available: [
      { id: 1, subject: "Programación II",subjectId: "programacion-ii", date1: "9/6/2025", date2: "23/6/2025", type: "Final",aula: "Aula 1", time:"18:30"},
      { id: 2, subject: "Base de Datos",subjectId: "BaseDeDatos", date1: "11/6/2025", date2: "25/6/2025", type: "Final" ,aula: "Aula 2", time:"20:30"},
      { id: 3, subject: "Sistemas Operativos",subjectId: "SistemaOperativo", date1: "14/6/2025", date2: "28/6/2025", type: "Final" ,aula: "Aula 1",time:"19:00" }
    ],
    upcoming: [
      { subject: "Matemática II", date: "15/11/2023", time: "09:00", aula: "Aula 10", type: "Regular" },
      { subject: "Programación I", date: "18/11/2023", time: "10:00", aula: "Aula 8", type: "Regular" },
      { subject: "Programación I", date: "05/12/2023", time: "16:00", aula: "Aula 3", type: "Libre" }
    ]
  };
  
  export const mockExamDetails = {
    subject: "Programación II",
    examDates: [
      { id: 101, type: "Mesa 1", date: "9/6/2025", time: "14:00", classroom: "Lab 3" },
      { id: 102, type: "Mesa 2", date: "23/6/2025", time: "16:00", classroom: "Lab 2" }
    ]
  };