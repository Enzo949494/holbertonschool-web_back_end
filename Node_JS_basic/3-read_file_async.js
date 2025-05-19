const fs = require('fs').promises;

async function countStudents(path) {
  try {
    // Read the file asynchronously
    const data = await fs.readFile(path, 'utf8');
    
    const lines = data.split('\n');
    const students = lines.filter((line) => line && line !== lines[0]);
    console.log(`Number of students: ${students.length}`);

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
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      }
    }
    
    return Promise.resolve(); // Resolve the promise successfully
  } catch (err) {
    return Promise.reject(new Error('Cannot load the database'));
  }
}

module.exports = countStudents;