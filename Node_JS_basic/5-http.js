const http = require('http');
const fs = require('fs').promises;

const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n');
    const students = lines.filter((line) => line && line !== lines[0]);
    let output = `Number of students: ${students.length}`;

    const fields = {};
    const columns = lines[0].split(',');
    const firstNamePos = columns.indexOf('firstname');
    const fieldPos = columns.indexOf('field');

    for (const student of students) {
      const studentData = student.split(',');
      const field = studentData[fieldPos];
      const firstName = studentData[firstNamePos];

      if (!fields[field]) fields[field] = [];
      fields[field].push(firstName);
    }

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      }
    }
    
    return output;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const studentsInfo = await countStudents(process.argv[2]);
      res.end(`This is the list of our students\n${studentsInfo}`);
    } catch (error) {
      res.end(`This is the list of our students\n${error.message}`);
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
