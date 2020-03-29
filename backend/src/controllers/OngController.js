const crypto = require("crypto");
const connection = require("../database");

module.exports = {
    async createOng(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        try {
            const id = crypto.randomBytes(4).toString("HEX");
            await connection("ongs").insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
            });
            return response.json({ id });
        } catch (e) {
            return response.status(400).json({
                message: "Not created",
            })
        }
    },
    async getOngs(request, response) {
        const ongs = await connection("ongs").select('*');
        return response.json(ongs);       
    }
}