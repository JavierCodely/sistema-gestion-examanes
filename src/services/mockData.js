// src/services/mockData.js
export const mockStudentInfo = {
    name: "Lisandro Recalde",
    career: "Tecnicatura en Tecnología de la Información",
    dni: "12345678",
    password: "1234",
    promedio: 8.5,
    asignaturasAprobadas: 20,
    cursando: 5
  };
  
  export const mockSubjects = [
    { name: "Programación II", grade: 8.5, status: "Promoción", gradeLevel: 2 },
    { name: "Base de Datos", grade: 6.2, status: "Regular", gradeLevel: 2 },
    { name: "Sistemas Operativos", grade: 7, status: "Promoción", gradeLevel: 3 },
    { name: "Matemática II", grade: 3.5, status: "Insuficiente", gradeLevel: 1 },
    { name: "Estadística", grade: 5, status: "Regular", gradeLevel: 1 }
  ];
  
  export const mockExams = {
    registered: [
      { subject: "Física I", date: "9/5/2025",mesa:"Mesa 1", type: "Final" },
      { subject: "Matemática I", date: "14/5/2025",mesa:"Mesa 2", type: "Final" }
    ],
    available: [
      { id: 1, subject: "Programación II",subjectId: "programacion-ii", date1: "9/6/2025", date2: "23/6/2025", type: "Regular",aula: "Aula 1", time:"18:30"},
      { id: 2, subject: "Base de Datos",subjectId: "BaseDeDatos", date1: "11/6/2025", date2: "25/6/2025", type: "Promocion" ,aula: "Aula 2", time:"20:30"},
      { id: 3, subject: "Sistemas Operativos",subjectId: "SistemaOperativo", date1: "14/6/2025", date2: "28/6/2025", type: "Promocion" ,aula: "Aula 1",time:"19:00" }
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