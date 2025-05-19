const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      
      const lines = data.split('\n');
      const students = lines.slice(1).filter((line) => line.trim());
      const fields = {};
      const columns = lines[0].split(',');
      const fieldIndex = columns.indexOf('field');
      const firstnameIndex = columns.indexOf('firstname');

      let report = `Number of students: ${students.length}`;
      
      students.forEach((student) => {
        const values = student.split(',');
        const field = values[fieldIndex];
        const firstname = values[firstnameIndex];
        
        if (!fields[field]) {
          fields[field] = [];
        }
        
        fields[field].push(firstname);
      });
      
      Object.keys(fields).forEach((field) => {
        report += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      });
      
      resolve(report);
    });
  });
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    
    const databaseFilename = process.argv[2];
    
    countStudents(databaseFilename)
      .then((report) => {
        res.end(report);
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const PORT = 1245;
app.listen(PORT);

module.exports = app;
