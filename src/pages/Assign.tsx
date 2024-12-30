import React, { useState } from 'react';
import { CSSProperties } from 'react';
import Sidebar from './Sidebar';
import { addUSers,relation } from '../querrys/querrys';


interface Employee {
  id: number;
  name: string;
  area: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  area: string;
  autor:string;
}

const employeesData: Employee[] = [
  { id: 1, name: 'Juan Pérez', area: 'Recursos Humanos' },
  { id: 2, name: 'Ana López', area: 'Finanzas' },
  { id: 3, name: 'Luis Sánchez', area: 'IT' },
  { id: 4, name: 'Marta Gómez', area: 'Marketing' },
  { id: 5, name: 'Carlos Díaz', area: 'IT' },
  { id: 6, name: 'Elena Martínez', area: 'Finanzas' },
];

const CourseCatalog: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({
    id: courses.length + 1,
    title: '',
    description: '',
    area: '',
    autor:'',
  });
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [employeeNumber, setEmployeeNumber] = useState<number | ''>('');

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    const employeesFiltered = employeesData.filter((employee) => employee.area === area);
    setFilteredEmployees(employeesFiltered);
  };

  const handleAddEmployeeToCourse = (courseId: number, employee: Employee) => {
    /*
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, employees: [...course.employees, employee] }
          : course
      )
    );*/
  };

 


  const handleAddSupbase = async () => {

    //console.log(newCourse.autor)
     // await addUSers(newCourse.title,newCourse.description,newCourse.area,newCourse.autor)
       // await relation()
     

    


  }
  

  const handleEmployeeSearch = (courseId: number) => {
   /* if (employeeNumber) {
      const foundEmployee = employeesData.find((employee) => employee.id === employeeNumber);
      if (foundEmployee) {
        handleAddEmployeeToCourse(courseId, foundEmployee);
        setEmployeeNumber('');
      } else {
        alert('Empleado no encontrado');
      }
    }*/
  };

  return (
    <div>
      <Sidebar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Capacitación Tarahumara</h1>
        <div style={styles.formContainer}>
          <h2 style={styles.subHeading}>Registrar Nuevo Curso</h2>
          <input
            type="text"
            placeholder="Título del curso"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            style={styles.input}
          />
          <textarea
            placeholder="Descripción del curso"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            style={styles.textarea}
          />
          <select
            value={newCourse.area}
            onChange={(e) => setNewCourse({ ...newCourse, area: e.target.value })}
            style={styles.select}
          >
            <option value="">Selecciona un área</option>
            <option value="Recursos Humanos">Recursos Humanos</option>
            <option value="Finanzas">Finanzas</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
          </select>
          <input
            type="autor"
            placeholder="Impartido"
            value={newCourse.autor}
            onChange={(e) => setNewCourse({ ...newCourse, autor: e.target.value })}
            style={styles.input}
          />

          <button onClick={handleAddSupbase} style={styles.addButton}>
            Agregar Curso
          </button>
        </div>

        {courses.length > 0 && (
          <div style={styles.courseList}>
            <h2 style={styles.subHeading}>Cursos Registrados</h2>
            {courses.map((course) => (
              <div key={course.id} style={styles.courseCard}>
                <h3>{course.title}</h3>
                <p><strong>Descripción:</strong> {course.description}</p>
                <p><strong>Área:</strong> {course.area}</p>
                <div style={styles.employeeSection}>
                  <h4>Agregar Empleados al Curso</h4>
                  <div style={styles.searchContainer}>
                    <input
                      type="number"
                      placeholder="Número de empleado"
                      value={employeeNumber}
                      onChange={(e) => setEmployeeNumber(Number(e.target.value))}
                      style={styles.input}
                    />
                    <button onClick={() => handleEmployeeSearch(course.id)} style={styles.searchButton}>
                      Buscar y agregar empleado
                    </button>
                  </div>
                  <select
                    value={selectedArea}
                    onChange={(e) => handleAreaChange(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">Selecciona un área</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                  </select>

                  {filteredEmployees.length > 0 && (
                    <ul style={styles.employeeList}>
                      {filteredEmployees.map((employee) => (
                        <li key={employee.id} style={styles.employeeItem}>
                          {employee.name}{' '}
                          <button onClick={() =>handleAddSupbase()} style={styles.addEmployeeButton}>
                            Agregar
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <h4>Empleados asignados:</h4>
               
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '90%',
    margin: '0 auto',
    fontFamily: 'Roboto, sans-serif',
    color: '#333',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '20px',
    marginBottom: '15px',
  },
  formContainer: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  addButton: {
    backgroundColor: '#9A3324',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  courseList: {
    marginTop: '30px',
  },
  courseCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  employeeSection: {
    marginTop: '20px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  searchButton: {
    marginLeft: '10px',
    padding: '10px 15px',
    backgroundColor: '#333',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '8px',
  },
  employeeList: {
    listStyle: 'none',
    paddingLeft: '0',
  },
  employeeItem: {
    padding: '5px 0',
  },
  addEmployeeButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#9A3324',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default CourseCatalog;
