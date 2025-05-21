const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim());
      if (lines.length <= 1) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const columns = lines[0].split(',');
      const fieldIndex = columns.indexOf('field');
      const firstnameIndex = columns.indexOf('firstname');

      const students = lines.slice(1);
      const fields = {};

      students.forEach((student) => {
        const values = student.split(',');
        const field = values[fieldIndex];
        const firstname = values[firstnameIndex];

        fields[field] = fields[field] || [];
        fields[field].push(firstname);
      });

      let report = `Number of students: ${students.length}`;
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
    const databaseFilename = process.argv[2];

    res.statusCode = 200;
    res.write('This is the list of our students\n');

    countStudents(databaseFilename)
      .then((report) => res.end(report))
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);
module.exports = app;
