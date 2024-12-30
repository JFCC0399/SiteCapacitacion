const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3307;

//dates to do a connection

const db = mysql.createConnection({
  host: '192.168.32.6',
  user: 'Felipe',
  password: '',
  database: 'moodle',
  port: '3307'
});

//connection database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});


// course assigned , completed  
app.use(cors());
app.get('/courses', (req, res) => {
  const sql = `
  SELECT 
    c.id AS course_id,
    c.fullname AS course_name,
    c.summary AS course_description,
    CONCAT(u.firstname, ' ', u.lastname) AS teacher_name,
    FROM_UNIXTIME(c.startdate, '%Y-%m-%d') AS start_date,
    FROM_UNIXTIME(c.enddate, '%Y-%m-%d') AS end_date,
    cat.name AS course_category -- Agregamos la categoría del curso (área/departamento)
FROM 
    mdl_course c
LEFT JOIN 
    mdl_context ctx ON ctx.instanceid = c.id AND ctx.contextlevel = 50
LEFT JOIN 
    mdl_role_assignments ra ON ra.contextid = ctx.id
LEFT JOIN 
    mdl_role r ON ra.roleid = r.id
LEFT JOIN 
    mdl_user u ON ra.userid = u.id
LEFT JOIN 
    mdl_course_categories cat ON cat.id = c.category -- Se une con la tabla de categorías
WHERE 
    r.shortname = 'editingteacher' -- Solo se considera a los profesores editores
ORDER BY 
    course_name;
`;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});


app.get('/allCourses',(req,res)=>{

  const query=`SELECT * FROM mdl_course`

  try{

    db.query(query,(err,result)=>{
      if(err){
        res.status(500).send('error')
      }else{
        res.json(result)
      }

    })

  }catch(e){
    console.log(e)
  }


})

//api users 
app.use(cors());
app.get('/users', (req, res) => {
  const sql = `
  SELECT 
  u.id AS user_id,
  CONCAT(u.firstname, ' ', u.lastname) AS user_name,
  u.email AS user_email,
  FROM_UNIXTIME(u.lastaccess, '%Y-%m-%d') AS last_access,
  FROM_UNIXTIME(u.firstaccess, '%Y-%m-%d') AS first_access,
  u.city AS user_city,
  u.country AS user_country,
  c.fullname AS course_name,
  c.id AS course_id
FROM
  mdl_user u
LEFT JOIN
  mdl_role_assignments ra ON ra.userid = u.id
LEFT JOIN
  mdl_context ctx ON ra.contextid = ctx.id
LEFT JOIN
  mdl_course c ON ctx.instanceid = c.id
WHERE
  ra.roleid = 5
ORDER BY
  user_name;
`;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});




//open port 
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
