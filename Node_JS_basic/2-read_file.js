const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  const lines = data.split('\n');
  // Remove empty lines and header
  const students = lines.filter((line) => line && line !== lines[0]);
  
  console.log(`Number of students: ${students.length}`);
  
  const fields = {};
  const columns = lines[0].split(',');
  const firstNamePos = columns.indexOf('firstname');
  const fieldPos = columns.indexOf('field');
  
  students.forEach((student) => {
    const studentData = student.split(',');
    const field = studentData[fieldPos];
    const firstName = studentData[firstNamePos];
    
    if (!fields[field]) fields[field] = { count: 0, names: [] };
    fields[field].count += 1;
    fields[field].names.push(firstName);
  });
  
  for (const field in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      const { count, names } = fields[field];
      console.log(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
    }
  }
}

module.exports = countStudents;
