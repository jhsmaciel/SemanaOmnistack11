const express = require("express")
const { createOng, getOngs } = require("./controllers/OngController");
const { createIncident, getIncidents, deleteIncident } = require("./controllers/IncidentController")
const { getProfileIncidents } = require("./controllers/ProfileController")
const { getNameById } = require("./controllers/SessionController")
const routes = express.Router()

routes.post('/ongs', createOng )
routes.get('/ongs', getOngs )

routes.get('/profile', getProfileIncidents)

routes.post('/incidents', createIncident )
routes.get('/incidents', getIncidents )
routes.delete('/incidents/:id', deleteIncident)

routes.get('/sessions', getNameById)

module.exports = routes;