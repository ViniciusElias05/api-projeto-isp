const csvData = require('./ManipulationData');
const path = require('path');

async function SelectSheet(data) {

    if (data.municipio == 'todos' && data.ano == 'todos') {
        const ObjectCSV = await csvData(path.join(process.cwd(), '/src/csv/PopulacaoEvolucaoAnualEstado.csv'));
        return ObjectCSV;

    } else if (data.municipio == 'todos' && data.ano != 'todos') {
        const ObjectCSV = await csvData(path.join(process.cwd(), '/src/csv/PopulacaoEvolucaoMensalEstado.csv'));
        return specifiedYear(data.ano, ObjectCSV);

    } else if (data.municipio != 'todos' && data.ano == 'todos') {
        const ObjectCSV = await csvData(path.join(process.cwd(), '/src/csv/PopulacaoEvolucaoAnuaMunic.csv'));
        return specifiedCounty(data.municipio, ObjectCSV);

    } else {
        const ObjectCSV = await csvData(path.join(process.cwd(), '/src/csv/PopulacaoEvolucaoMensalMunic.csv'));
        return specifiedCountyAndYear(data, ObjectCSV);
    }

}

function specifiedCounty(munic, ObjectCSV) {
    return ObjectCSV.filter((ObjectMunic) => ObjectMunic.munic === munic);
}

function specifiedYear(ano, ObjectCSV) {
    return ObjectCSV.filter((ObjectMunic) => ObjectMunic.ano === ano);
}

function specifiedCountyAndYear(req, ObjectCSV) {
    return ObjectCSV.filter((ObjectMunic) => ObjectMunic.ano === req.ano && ObjectMunic.munic === req.municipio);
}

module.exports = SelectSheet;
