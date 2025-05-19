const fs = require('fs');

function countStudents(path) {
  try {
    // Read the database file synchronously
    const data = fs.readFileSync(path, 'utf8');
    
    // Split the file into lines and filter empty lines
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const fieldIndex = headers.indexOf('field');
    const firstNameIndex = headers.indexOf('firstname');
    
    // Filter header and empty lines
    const studentLines = lines.slice(1).filter(line => line.trim() !== '');
    
    console.log(`Number of students: ${studentLines.length}`);
    
    // Group students by field
    const studentsByField = {};
    
    studentLines.forEach(line => {
      const fields = line.split(',');
      const field = fields[fieldIndex];
      const firstName = fields[firstNameIndex];
      
      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      
      studentsByField[field].push(firstName);
    });
    
    // Display information for each field
    Object.keys(studentsByField).forEach(field => {
      const students = studentsByField[field];
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    });
    
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
