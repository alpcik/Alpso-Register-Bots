const mongoose = require("mongoose");
const settings = require("../Settings/GuildSettings.json");

mongoose.connect(settings.mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Database bağlantısı tamamlandı!");
});
mongoose.connection.on("error", () => {
  console.error("[ERROR] Database bağlantısı başarısız.");
});
