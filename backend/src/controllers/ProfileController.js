const connection = require("../database");
const table = "incidents";

module.exports = {
    async getProfileIncidents(request, response) {
        const { authorization } = request.headers;
        const incidents = await connection(table).select('*')
            .where('ong_id', authorization);
        return response.json(incidents);       
    },
    
}