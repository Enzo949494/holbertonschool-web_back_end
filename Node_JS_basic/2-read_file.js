const fs = require('fs');

function countStudents(path) {
  let fileContent;
  
  try {
    fileContent = fs.readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
  
  // Split the file into lines and remove empty lines
  const lines = fileContent.toString().trim().split('\n');
  
  // Skip the header and filter out empty lines
  const studentLines = lines.slice(1).filter(line => line.trim());
  
  console.log(`Number of students: ${studentLines.length}`);
  
  // Parse the header to find field and firstname indices
  const headers = lines[0].split(',');
  const fieldIndex = headers.indexOf('field');
  const firstNameIndex = headers.indexOf('firstname');
  
  // Group students by field
  const studentsByField = {};
  
  for (const line of studentLines) {
    const fields = line.split(',');
    const field = fields[fieldIndex].trim();
    const firstName = fields[firstNameIndex].trim();
    
    if (!studentsByField[field]) {
      studentsByField[field] = [];
    }
    
    studentsByField[field].push(firstName);
  }
  
  // Display information for each field
  for (const field of Object.keys(studentsByField)) {
    const students = studentsByField[field];
    console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
  }
}

module.exports = countStudents;
