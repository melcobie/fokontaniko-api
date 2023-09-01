let mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

let ActualiteSchema = mongoose.Schema({
    titre: String,
    contenu: String,
    images: [String],
    status: String,
    dateCreation: Date
});

ActualiteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('actualite', ActualiteSchema);