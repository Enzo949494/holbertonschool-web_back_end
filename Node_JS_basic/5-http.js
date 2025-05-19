const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Cannot load the database'));
      return;
    }
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      
      const lines = data.trim().split('\n');
      const dbFieldNames = lines[0].split(',');
      const studentsByField = {};
      
      // Skip header, process each student line
      lines.slice(1).forEach((line) => {
        if (line.trim()) { // Skip empty lines
          const studentRecord = line.split(',');
          if (studentRecord.length === dbFieldNames.length) {
            const studentEntries = studentRecord.map((prop, idx) => [
              dbFieldNames[idx],
              prop,
            ]);
            const student = Object.fromEntries(studentEntries);
            
            if (!studentsByField[student.field]) {
              studentsByField[student.field] = [];
            }
            studentsByField[student.field].push(student.firstname);
          }
        }
      });

      // Calculate total students
      const totalStudents = Object.values(studentsByField)
        .reduce((pre, cur) => pre + cur.length, 0);
      
      let report = `Number of students: ${totalStudents}`;
      
      // Add field-specific information
      Object.entries(studentsByField).forEach(([field, names]) => {
        report += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      });

      resolve(report);
    });
  });
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.url === '/') {
    res.statusCode = 200;
    res.write('Hello Holberton School!');
    res.end();
  } else if (req.url === '/students') {
    const databaseFilename = process.argv[2];
    
    res.write('This is the list of our students\n');
    
    countStudents(databaseFilename)
      .then((report) => {
        res.statusCode = 200;
        res.end(report);
      })
      .catch((error) => {
        res.statusCode = 200;
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not found\n');
  }
});

app.listen(1245);

module.exports = app;
