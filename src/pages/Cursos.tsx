import React, { useState,useEffect } from 'react';
import { CSSProperties } from 'react';
import Sidebar from './Sidebar';
import { getUsers } from '../querrys/querrys';

interface Employee {
  id: number;
  name: string;
  area: string;
  autor :string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  area: string;
  autor :string;
  //employees: Employee[];
}
interface courses2 {
  id: number;
  name: string;
  description: string;
  area: string;
  employees: Employee[];
}

interface CourseJson {
  id:number,
  category:number,
  sortorder:number,
   fullname:string
}


const employeesData: Employee[] = [
  { id: 1, name: 'Juan Pérez', area: 'Recursos Humanos',autor:"hola" },
  { id: 2, name: 'Ana López', area: 'Finanzas',autor:"hola" },
  { id: 3, name: 'Luis Sánchez', area: 'IT',autor:"hola"  },
  { id: 4, name: 'Marta Gómez', area: 'Marketing' ,autor:"hola" },
  { id: 5, name: 'Carlos Díaz', area: 'IT',autor:"hola"  },
  { id: 6, name: 'Elena Martínez', area: 'Finanzas',autor:"hola"  },
];

const sampleCourses: Course[] = [
  { id: 1, name: 'Curso de Liderazgo', description: 'Desarrolla habilidades de liderazgo', area: 'Recursos Humanos' ,autor:"hola" },
  { id: 2, name: 'Introducción a Finanzas', description: 'Conceptos básicos de finanzas', area: 'Finanzas',autor:"hola"  },
  { id: 3, name: 'React para principiantes', description: 'Fundamentos de React', area: 'IT' ,autor:"hola" },
  { id: 4, name: 'Marketing Digital', description: 'Estrategias de marketing en línea', area: 'Marketing',autor:"hola"  },
  { id: 5, name: 'Big Data en IT', description: 'Análisis de grandes volúmenes de datos', area: 'IT',autor:"hola"  },
];

const CourseCatalog: React.FC = () => {
 
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [courses2, setCourses2] = useState<Course[]>([]);
  const [formatJson,setFormatJson]= useState<CourseJson []>([])

  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para búsqueda
  const [selectedArea, setSelectedArea] = useState<string>(''); // Estado para el filtro por área
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // Curso seleccionado para ver información
  const [editCourse, setEditCourse] = useState<Course | null>(null); // Curso seleccionado para editar
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Estado del diálogo
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false); // Estado del diálogo de edición
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const get=await getUsers();
       
        setCourses2(get ?? []); 
        console.log("ay mi madre el bicho",)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchData2=async()=>{
      try{
        const connect= await fetch("http://192.168.36.194:3307/allCourses") 
        if (!connect.ok) {
          throw new Error('Network response was not ok');
        }

        //const json=await connect.json()

        const data :CourseJson[]=await connect.json()
        
      
        setFormatJson(data);

        // Mostrar todos los fullname de los cursos en consola
       
        console.log("el formato del json es ",data)

       }catch(e){
        console.log(e)
       }

       
    }
  
    fetchData();
  }, []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
  };

  const filteredCourses = courses2?.filter((course) => {
    return (
      (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedArea === '' || course.area === selectedArea)
    );
  }) || [];  
 
  
  

 

  const handleOpenDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  // Manejar el cierre del diálogo de información
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCourse(null);
  };

  // Manejar la apertura del diálogo de edición
  const handleOpenEditDialog = (course: Course) => {
    setEditCourse(course);
    setIsEditDialogOpen(true);
  };

  // Manejar el cierre del diálogo de edición
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditCourse(null);
  };

  // Guardar los cambios en la edición del curso
  const handleSaveEdit = () => {
    if (editCourse) {
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === editCourse.id ? editCourse : course
        )
      );
      handleCloseEditDialog();
    }
  };

  return (
    <div>     
      <Sidebar />
    <div style={styles.container}>
      <h1 style={styles.heading}>Capacitación Tarahumara</h1>

      {/* Barra de búsqueda */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por título o descripción"
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.input}
        />
        <select value={selectedArea} onChange={handleAreaChange} style={styles.select}>
          <option value="">Todas las áreas</option>
          <option value="Recursos Humanos">Recursos Humanos</option>
          <option value="Finanzas">Finanzas</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Tabla de cursos */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Título</th>
            <th style={styles.th}>Descripción</th>
            <th style={styles.th}>Área</th> 
            <th style={styles.th}>impartido por</th>
            <th style={styles.th}>Acciones</th>
           
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <tr key={course.id}>
                <td style={styles.td}>{course.name}</td>
                <td style={styles.td}>{course.description}</td>
                <td style={styles.td}>{course.area}</td>
                <td style={styles.td}>{course.autor}</td>
                <td style={styles.td}>
                  <button onClick={() => handleOpenDialog(course)} style={styles.button}>
                    Ver
                  </button>
                  <button onClick={() => handleOpenEditDialog(course)} style={styles.button}>
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={styles.noResults}>
                No se encontraron cursos.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Fondo borroso y diálogo para ver la información del curso */}
      {selectedCourse && isDialogOpen && (
        <div>
          <div style={styles.blurBackground}></div>
          <div style={styles.dialog}>
            <h2>Detalles del Curso</h2>
            <p><strong>Título:</strong> {selectedCourse.name}</p>
            <p><strong>Descripción:</strong> {selectedCourse.description}</p>
            <p><strong>Área:</strong> {selectedCourse.area}</p>
            <p><strong>Empleados:</strong></p>
         
            <button onClick={handleCloseDialog} style={styles.closeButton}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Fondo borroso y diálogo para editar la información del curso */}
      {editCourse && isEditDialogOpen && (
        <div>
          <div style={styles.blurBackground}></div>
          <div style={styles.dialog}>
            <h2>Editar Curso</h2>
            <input
              type="text"
              value={editCourse.name}
              onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
              style={styles.input}
            />
            <textarea
              value={editCourse.description}
              onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
              style={styles.textarea}
            />
            <select
              value={editCourse.area}
              onChange={(e) => setEditCourse({ ...editCourse, area: e.target.value })}
              style={styles.select}
            >
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Finanzas">Finanzas</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
            </select>
            <button onClick={handleSaveEdit} style={styles.saveButton}>Guardar Cambios</button>
            <button onClick={handleCloseEditDialog} style={styles.closeButton}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '90%',
    margin: 'auto',
    fontFamily: 'Roboto, sans-serif',
    color: '#333',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    width: '70%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  select: {
    width: '25%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
  },
  noResults: {
    textAlign: 'center',
    padding: '20px',
    color: '#888',
  },
  button: {
    margin: '0 5px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  dialog: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    zIndex: 1000,
  },
  blurBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(5px)', // Aplicamos el filtro de desenfoque aquí
    zIndex: 999, // Asegura que el fondo borroso esté detrás del diálogo
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    marginTop: '10px',
  },
};

export default CourseCatalog;
