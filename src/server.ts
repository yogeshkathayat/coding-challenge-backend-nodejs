
import app from "./config/app";
import sequelize from "./config/sequelize";


/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), async() => {
  // await sequelize.sync({force: true});
  console.log(" App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
