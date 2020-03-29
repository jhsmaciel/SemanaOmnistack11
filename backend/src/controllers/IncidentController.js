const connection = require("../database");
const table = "incidents";

module.exports = {
    async createIncident(request, response) {
        const { title, description, value } = request.body;
        const { authorization } = request.headers;
        try {
            const [id] = await connection(table).insert({
                title,
                description,
                value,
                ong_id: authorization
            });
            return response.json({ id });
        } catch (e) {
            return response.status(400).json({
                message: "Not created",
            })
        }
    },
    
    async getIncidents(request, response) {
        const { page = 1, qtd = 5 } = request.query;
        const [count] = await connection(table)
            .count();

        const incidents = await connection(table)
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(qtd)
            .offset(( page - 1 ) * qtd)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header("X-Total-Count", count["count(*)"])
        return response.json(incidents);       
    },

    async deleteIncident(request, response){
        const { id } = request.params;
        const { authorization } = request.headers;

        const { ong_id } = await connection(table)
            .where('id', id)
            .select("ong_id")
            .first()

        if( authorization !== ong_id ){
            return response.status(401).json({
                error: "Operation not permitted."
            })
        } 

        await connection(table).where("id", id).delete();

        return response.status(204).send();
    }
}