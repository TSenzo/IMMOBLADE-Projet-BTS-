class Mesures {
    constructor () {
        this.mesures = [];
    }

    addMesure(data) {
        this.mesures.push(data);
    }

    getMesures() {
        return this.mesures;
    }
    
}

module.exports.Mesures = Mesures;