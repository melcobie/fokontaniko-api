import express = require("express");
import bodyParser = require('body-parser');
import { AppDataSource } from "./data-source"
import authentication from "./routes/authentication"
import { isAuthentified, isAuthorizedAdmin, isAuthorizedFonctionnaire, isOwner } from "./middleware/authorization";
import foyerRoutes from "./routes/foyer-routes";
import eventRoutes from "./routes/event-routes";
import requeteRoutes from "./routes/requete-routes";
import impotRoutes from "./routes/impot-routes";
import historiqueRoutes from "./routes/historique-routes";
import citoyenRoutes from "./routes/citoyen-routes";
import mongoose from "mongoose";
import actualiteRoutes from "./routes/actualite-routes";
import oracledb = require("oracledb");
import dotenv from "dotenv";

let app = express();
dotenv.config();

let port = process.env.PORT || 8010;

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
// const uri = 'mongodb+srv://assignment_user:l3ZW66F2lbJRPqW4@cluster0.2tfsfap.mongodb.net/assignment?retryWrites=true&w=majority';
const uri = 'mongodb://localhost:27017/fokontaniko?readPreference=primary&directConnection=true&ssl=false';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // poolSize: 10,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

  let clientOpts = {};
  // if (process.platform === 'win32') {                                   // Windows
  //     clientOpts = { libDir: 'C:\\oracle\\instantclient_19_18' };
  // } else if (process.platform === 'darwin' && process.arch === 'x64') { // macOS Intel
  //     clientOpts = { libDir: process.env.HOME + '/Downloads/instantclient_19_8' };
  // } // else on other platforms the system library search path
  //   // must always be set before Node.js is started.
  clientOpts = { libDir: process.env.LD_LIBRARY_PATH + '/instantclient_19_19'};
  // enable Thick mode which is needed for SODA
  oracledb.initOracleClient(clientOpts);

AppDataSource.initialize()
    .then(() => {
      console.log("Connexion à Oracle réussie");
    })
    .catch((error) => console.log(error))

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Les routes
let prefix = "/api";

// Services d'authentification
app.route(prefix + "/signin")
  .post(authentication.authenticate);

app.route(prefix + "/signup")
  .post(authentication.signup);

app.route(prefix + "/signout")
.delete(authentication.logout);

app.route(prefix + "/signup/email")
  .get(authentication.checkIfEmailExists);

app.route(prefix + "/signup/adresse")
  .get(authentication.checkIfAdresseExists);

app.route(prefix + "/signup/adresses")
  .get(authentication.getExistingAdresse);


// Foyers
app.route(prefix + "/myfoyer")
    .get(isAuthentified, foyerRoutes.getMyFoyer);
app.route(prefix + "/allfoyer")
    .get(isAuthentified, isAuthorizedAdmin, foyerRoutes.getAllFoyer);
app.route(prefix + "/citoyen")
  .post(isAuthentified, citoyenRoutes.insertCitoyen);
app.route(prefix + "/citoyen/:id")
  .put(isAuthentified, isOwner, citoyenRoutes.updateCitoyen);


// Evenements
app.route(prefix + "/events")
    .get(eventRoutes.onGoingEvent)
    .post(eventRoutes.fairePresence);

// Impots
app.route(prefix + "/impot")
  .post(impotRoutes.payerImpot);

// Actualites
app.route(prefix + "/actualites")
  .get(actualiteRoutes.getActualites)


// Requetes
app.route(prefix + "/requete")
  .get(requeteRoutes.getRequests)
  .post(isAuthentified, isOwner, requeteRoutes.makeARequest)
  .put(isAuthentified, isAuthorizedFonctionnaire, requeteRoutes.approveRequest)


// Historiques
app.route(prefix + "/historique/requetes")
  .get(isAuthentified, historiqueRoutes.getDemandes);

app.route(prefix + "/historique/impots")
  .get(isAuthentified, historiqueRoutes.getImpots)

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);
