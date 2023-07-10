const fs = require('fs');
const csv = require('fast-csv');

async function readCSVFile(path) {
    return new Promise((resolve, reject) => {
        const csvData = [];

        fs.createReadStream(path)
            .pipe(csv.parse({ headers: true, delimiter: ';' }))
            .on('error', error => reject(error))
            .on('data', row => csvData.push(row))
            .on('end', () => {
                resolve(csvData);
            });
    });
}

module.exports = readCSVFile;

