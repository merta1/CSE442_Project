package edu.buffalo.cse442;

import static spark.Spark.*;

import edu.buffalo.cse442.handlers.DBActionHandler;
import edu.buffalo.cse442.handlers.DebateHandler;
import edu.buffalo.cse442.handlers.UserHandler;
import org.apache.log4j.BasicConfigurator;

public class Main {

    private DebateHandler debateHandler;
    private UserHandler userHandler;
    private DBActionHandler dbActionsHandler;


    Main() {
        debateHandler = new DebateHandler();
        userHandler = new UserHandler();
        dbActionsHandler = new DBActionHandler();
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
        after((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET");
            response.header("Access-Control-Allow-Methods", "POST");
            response.header("Access-Control-Allow-Methods", "PUT");
        });

        // First, connect the debate endpoints.
        post("/debate", (req, res) -> debateHandler.createDebate(
                req.params("userid"),
                req.params("title"),
                Integer.parseInt(req.params("readPermissions")),
                Integer.parseInt(req.params("writePermissions")),
                req.params("SideATitle"),
                req.params("SideBTitle"),
                req.params("Summary")
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
        put("/user/login", (req, res) -> {
            return userHandler.login(req.params("username"), req.params("password"));
        });

        post("/user/register", (req, res) -> userHandler.register(
                req.params("firstname"),
                req.params("lastname"),
                req.params("email"),
                req.params("password"),
                req.params("username")
        ));
    }
}
