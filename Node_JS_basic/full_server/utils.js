import fs from 'fs';

const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject(new Error('Cannot load the database'));
      return;
    }
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      
      const lines = data.split('\n').filter(line => line.trim());
      if (lines.length <= 1) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const columns = lines[0].split(',');
      const fieldIndex = columns.indexOf('field');
      const firstnameIndex = columns.indexOf('firstname');
      
      const fields = {};
      
      lines.slice(1).forEach((line) => {
        const values = line.split(',');
        const field = values[fieldIndex];
        const firstname = values[firstnameIndex];
        
        if (field && firstname) {
          if (!fields[field]) {
            fields[field] = [];
          }
          
          fields[field].push(firstname);
        }
      });
      
      resolve(fields);
    });
  });
};

export default readDatabase;
