const http = require('http');
const fs = require('fs').promises;

const countStudents = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8')
      .then((data) => {
        const lines = data.split('\n');
        const students = lines.filter((line) => line && line !== lines[0]);
        let output = `Number of students: ${students.length}\n`;

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
            output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
            // Ne pas ajouter \n après la dernière ligne
            if (Object.keys(fields).indexOf(field) < Object.keys(fields).length - 1) {
              output += '\n';
            }
          }
        }
        
        resolve(output);
      })
      .catch(() => {
        reject(new Error('Cannot load the database'));
      });
  });
};

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  const dbPath = process.argv[2];

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    
    countStudents(dbPath)
      .then((result) => {
        res.end(result);
      })
      .catch((error) => {
        res.end(`${error.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
