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
      const reportParts = [];
      const lines = data.trim().split('\n');
      const studentGroups = {};
      const dbFieldNames = lines[0].split(',');
      const studentPropNames = dbFieldNames.slice();

      const studentsByField = {};

      lines.slice(1).forEach((line) => {
        const studentRecord = line.split(',');
        if (studentRecord.length === dbFieldNames.length) {
          const studentEntries = studentRecord.map((prop, idx) => [
            studentPropNames[idx],
            prop,
          ]);
          const student = Object.fromEntries(studentEntries);
          
          if (!studentsByField[student.field]) {
            studentsByField[student.field] = [];
          }
          studentsByField[student.field].push(student.firstname);
        }
      });

      const totalStudents = Object
        .values(studentsByField)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      reportParts.push(`Number of students: ${totalStudents}`);

      for (const [field, group] of Object.entries(studentsByField)) {
        reportParts.push(`Number of students in ${field}: ${group.length}. List: ${group.join(', ')}`);
      }

      resolve(reportParts.join('\n'));
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
    countStudents(databaseFilename)
      .then((report) => {
        res.statusCode = 200;
        res.write('This is the list of our students\n');
        res.end(report);
      })
      .catch((error) => {
        res.statusCode = 200;
        res.write('This is the list of our students\n');
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
