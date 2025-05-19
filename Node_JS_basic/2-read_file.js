const fs = require('fs');

function countStudents(path) {
  try {
    // Lire le fichier de manière synchrone
    const data = fs.readFileSync(path, 'utf8');
    
    // Diviser le fichier en lignes et filtrer les lignes vides
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const fieldIndex = headers.indexOf('field');
    const firstNameIndex = headers.indexOf('firstname');
    
    // Filtrer l'en-tête et les lignes vides
    const studentLines = lines.slice(1).filter(line => line.trim() !== '');
    
    console.log(`Number of students: ${studentLines.length}`);
    
    // Grouper les étudiants par domaine d'étude
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
    
    // Afficher les informations pour chaque domaine d'étude
    Object.keys(studentsByField).forEach(field => {
      const students = studentsByField[field];
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    });
    
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
