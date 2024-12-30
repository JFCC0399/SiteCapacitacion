import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

// Initial list of example courses
const initialCourses = [
  { id: 1, name: 'Curso de Seguridad', description: 'Capacitación sobre seguridad laboral.', date: '10/01/2023' },
  { id: 2, name: 'Capacitación de Conducción', description: 'Entrenamiento avanzado en conducción de vehículos de carga.', date: '09/15/2023' },
  { id: 3, name: 'Primeros Auxilios', description: 'Curso de primeros auxilios para situaciones de emergencia.', date: '08/22/2023' },
];

// List of courses available to add
const availableCourses = [
  { id: 4, name: 'Manejo de Materiales Peligrosos', description: 'Curso sobre el manejo seguro de materiales peligrosos.', date: '11/10/2023' },
  { id: 5, name: 'Técnicas de Comunicación', description: 'Mejora de habilidades de comunicación en el entorno laboral.', date: '12/05/2023' },
  { id: 6, name: 'Rescate en Alturas', description: 'Curso sobre técnicas de rescate en alturas.', date: '11/20/2023' },
];

interface User {
  id: number;
  name: string;
  entryDate: string;
  position: string;
  department: string;
  type: string;
}

// Kardex Component
const Kardex = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState(initialCourses);
  const [newCourseId, setNewCourseId] = useState<number | ''>(''); // For selected course from the dropdown
  const [dialogInfo, setDialogInfo] = useState<{ id: number; isOpen: boolean }>({ id: 0, isOpen: false });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.32.6/users');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Handle adding new course from the dropdown
  const handleAddCourse = () => {
    const selectedCourse = availableCourses.find(course => course.id === newCourseId);
    if (selectedCourse) {
      setCourses([...courses, { ...selectedCourse }]);
      setNewCourseId(''); // Reset selection
    }
  };

  // Handle editing an existing course
  const handleEditCourse = (id: number, newName: string) => {
    const updatedCourses = courses.map(course =>
      course.id === id ? { ...course, name: newName } : course
    );
    setCourses(updatedCourses);
  };

  // Handle opening/closing the dialog for course information
  const toggleDialog = (id: number) => {
    setDialogInfo({ id, isOpen: !dialogInfo.isOpen });
  };

  return (
    <div>     
      <Sidebar />
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', border: '1px solid black', padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <img src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/6088316/314367_858588.png" alt="Grupo Tarahumara" style={{ width: '180px', height: 'auto' }} />
          <div style={{ textAlign: 'right', fontSize: '16px' }}>
            <p><strong>Avance:</strong> %</p>
            <p><strong>Estatus:</strong> ALTA</p>
          </div>
        </div>

        {/* Personal Information Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
          <div>
            <p><strong>Número:</strong> 27</p>
            <p><strong>Nombre:</strong> GARCIA ASPE JOSE LUIS</p>
            <p><strong>Fecha de ingreso:</strong> 10/23/2007</p>
            <p><strong>Puesto:</strong> Chofer</p>
            <p><strong>Departamento:</strong> Piso Tarahumara</p>
            <p><strong>Tipo:</strong> Semanal</p>
          </div>
          <img 
            src="https://img.freepik.com/vector-premium/avatar-hombre-barba-foto-perfil-masculina-generica_53562-20202.jpg" 
            alt="Foto del empleado" 
            style={{ borderRadius: '50%', width: '150px', height: '150px', border: '5px solid #9A3324' }} 
          />
        </div>

        {/* Courses Section */}
        <h2 style={{ backgroundColor: '#9A3324', color: 'white', padding: '10px', textAlign: 'center', borderRadius: '5px' }}>Cursos Tomados</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #9A3324', padding: '10px', backgroundColor: '#9A3324', color: 'white' }}>ID</th>
              <th style={{ border: '1px solid #9A3324', padding: '10px', backgroundColor: '#9A3324', color: 'white' }}>Curso</th>
              <th style={{ border: '1px solid #9A3324', padding: '10px', backgroundColor: '#9A3324', color: 'white' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{course.id}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <input
                    type="text"
                    value={course.name}
                    onChange={e => handleEditCourse(course.id, e.target.value)}
                    style={{ width: '100%', border: '1px solid #9A3324', borderRadius: '4px', padding: '5px' }}
                  />
                </td>
                <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                  <button
                    style={{ backgroundColor: '#9A3324', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handleEditCourse(course.id, course.name)}
                  >
                    Editar
                  </button>
                  <button
                    style={{ backgroundColor: '#5A5A5A', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
                    onClick={() => toggleDialog(course.id)}
                  >
                    Información
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Course Section */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          <select
            value={newCourseId}
            onChange={e => setNewCourseId(Number(e.target.value))}
            style={{ width: '75%', border: '1px solid #9A3324', borderRadius: '5px', padding: '10px', marginRight: '10px' }}
          >
            <option value="">Seleccionar Curso</option>
            {availableCourses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <button
            style={{ backgroundColor: '#9A3324', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}
            onClick={handleAddCourse}
            disabled={!newCourseId} // Disable if no course is selected
          >
            Agregar Curso
          </button>
        </div>

        {/* Course Information Dialog */}
        {dialogInfo.isOpen && (
          <div style={{
            position: 'fixed', 
            top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <div style={{
              backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxWidth: '500px', width: '100%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Detalles del Curso</h3>
              <p><strong>ID:</strong> {dialogInfo.id}</p>
              <p><strong>Nombre:</strong> {courses.find(c => c.id === dialogInfo.id)?.name}</p>
              <p><strong>Descripción:</strong> {courses.find(c => c.id === dialogInfo.id)?.description}</p>
              <p><strong>Fecha:</strong> {courses.find(c => c.id === dialogInfo.id)?.date}</p>
              <button
                style={{ backgroundColor: '#9A3324', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}
                onClick={() => toggleDialog(dialogInfo.id)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kardex;
