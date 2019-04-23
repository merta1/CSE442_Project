package edu.buffalo.cse442;

import static spark.Spark.*;

import edu.buffalo.cse442.handlers.DBActionHandler;
import edu.buffalo.cse442.handlers.DebateHandler;
import edu.buffalo.cse442.handlers.UserHandler;
import edu.buffalo.cse442.handlers.CommentHandler;
import org.apache.log4j.BasicConfigurator;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.FileInputStream;
import java.util.Properties;

public class Main {

    private DebateHandler debateHandler;
    private UserHandler userHandler;
    private CommentHandler commentHandler;
    private DBActionHandler dbActionsHandler;
    private Properties prop;


    Main() {

        dbActionsHandler = new DBActionHandler(getProperty("database.connectionString"),getProperty("database.username"),getProperty("database.password"));
        debateHandler = new DebateHandler(getProperty("database.connectionString"),getProperty("database.username"),getProperty("database.password"));
        commentHandler = new CommentHandler(getProperty("database.connectionString"),getProperty("database.username"),getProperty("database.password"));
        userHandler = new UserHandler(getProperty("password.salt"),getProperty("database.connectionString"),getProperty("database.username"),getProperty("database.password"));

    }

    public static void main(String[] args) {
    	BasicConfigurator.configure();

        Main main = new Main();
        main.createDBandTables();
        main.establishEndpoints();
    }

    void createDBandTables() {
        dbActionsHandler.createDB();
        dbActionsHandler.createUserTable();
        dbActionsHandler.createDebateTable();
        dbActionsHandler.createCommentTable();
        dbActionsHandler.createUserOpinionTable();


    }

    void establishEndpoints() {
        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET");
            response.header("Access-Control-Allow-Methods", "POST");
            response.header("Access-Control-Allow-Methods", "PUT");
            response.header("Access-Control-Allow-Methods", "OPTIONS");
        });

        // First, connect the debate endpoints.
        post("/debate", (req, res) -> debateHandler.createDebate(
                Integer.parseInt(req.queryParams("ownerid")),
                Integer.parseInt(req.queryParams("open")),
                Integer.parseInt(req.queryParams("public")),
                req.queryParams("title"),
                //   Integer.parseInt(req.params("readPermissions"))
                //   Integer.parseInt(req.params("writePermissions")),
                req.queryParams("SideATitle"),
                req.queryParams("SideBTitle"),
                req.queryParams("Summary")
        ));

        get("/debate/:id", (req, res) -> {
            String idString = req.params(":id");
            int id = Integer.parseInt(idString);
            return debateHandler.get(id);
        });

        get("/debates/search/:query", (req, res) -> debateHandler.search(req.queryParams(":query")));

        get("/debates/:input", (req, res) -> {
            String input = req.params(":input");
            try {
                // Try to parse the input as an integer, the id of a user.
                return debateHandler.getDebatesCreatedBy(Integer.parseInt(input));
            } catch (Exception e) {
                if (input.equals("active"))
                    return debateHandler.getActive();
                else if (input.equals("controversial"))
                    return debateHandler.getControversial();
                else if (input.equals("popular"))
                    return debateHandler.getPopularDebates();
                else if (input.equals("recent"))
                    return debateHandler.getRecentDebates();

                // Otherwise, we have no solution. Throw the error.
                throw e;
            }
        });

        // Next, connect the user handler.
        post("/user/login", (req, res) -> {
            return userHandler.login(req.queryParams("emaillogin"), req.queryParams("passwordlogin"));
        });

        post("/user/register", (req, res) -> userHandler.register(
                req.queryParams("firstname"),
                req.queryParams("lastname"),
                req.queryParams("email"),
                req.queryParams("password"),
                req.queryParams("username")
        ));

        // Now create comment handlers
        post("/comment", (req, res) -> commentHandler.addComment(
                Integer.parseInt(req.queryParams("userid")),
                Integer.parseInt(req.queryParams("debateid")),
                req.queryParams("side"),
                req.queryParams("comment")
        ));
    }



    public static String getProperty(String propName) {

        String propValue = null;

        try {

            //to load application's properties, we use this class
            Properties mainProperties = new Properties();

            FileInputStream file;

            //the base folder is ./, the root of the main.properties file
            String path = "config.properties";

            //load the file handle for main.properties
            file = new FileInputStream(path);

            //load all the properties from this file
            mainProperties.load(file);

            //we have loaded the properties, so close the file handle
            file.close();

            //retrieve the property we are intrested, the app.version
            propValue = mainProperties.getProperty(propName);

        } catch (FileNotFoundException e) {
            System.out.println("config.properties not found");
        } catch (IOException e) {
            System.out.println("Unknown config file error.");
        }

        return propValue;
    }
}
