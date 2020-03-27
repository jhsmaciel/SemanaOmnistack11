const connection = require("../database");
const table = "ong";

module.exports = {
    async getNameById(request, response) {
        const { id } = request.body;
        const ong = await connection(table)
            .where('id', id)
            .select('name')
            .first();
        if (!ong){
            return response.status(400).json({ error: "No ONG found with this ID"});
        }
        return response.json(ong);
    },

}