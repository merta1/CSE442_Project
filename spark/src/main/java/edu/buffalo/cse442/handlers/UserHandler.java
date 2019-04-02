package edu.buffalo.cse442.handlers;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

public class UserHandler {

    private DBActionHandler db;


    public UserHandler() {
        DBActionHandler db = new DBActionHandler();
    }

    /**
     * This method should be called in response to a put request
     * to the server and should log the user in.
     * @param username The username of the user attempting to log in.
     * @param password The password of the user attempting to log in.
     * @return A JSON String containing status info about the login attempt.
     */
    public String login(String username, String password) {
        /** TODO Implement login in PUT request handler. */

        try {
            Connection connection = db.openDBConnection("debateapp");
            Statement stmt= connection.createStatement();
            String query = "SELECT * FROM Users WHERE (Username = "+ username +" OR Email = "+ username +" AND EncryptedPassword = "+ password +");";
            ResultSet rs = stmt.executeQuery(query);
            connection.close();
            if (rs.next()) {
                return "{\"status\":\"ok\",\"message\":\"Valid Login.\",\"userid\":\""+rs.getInt("Id")+"\"}";
            } else {
                return "{\"status\":\"error\",\"message\":\"Login Incorrect.\"}";
            }

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\"A SQL error occured.\"}";
        } catch(Exception e){
            return "{\"status\":\"error\",\"message\":\"An unknown error occured.\"}";
        }

    }

    /**
     * This method should register a new user with the specified details.
     * The parameters are TBD.
     * @return A JSON String containing status info about the register attempt.
     */
    public String register(String firstname, String lastname, String email, String password, String username) {

        //TODO: we need to check to see if the user is already registered and return an error message if they are.

        try {
            Connection connection = db.openDBConnection("debateapp");
            Statement stmt= connection.createStatement();
            String query = "INSERT INTO `DEBATEAPP`.`Users` (" +
                    " `FirstName`, `LastName`, `UserName`, `Email`, `EncryptedPassword`, `UserLevel`) Values (" +
                    "\"" + firstname + "\"" + ", " +
                    "\"" + lastname + "\"" + ", " +
                    "\"" + username + "\"" + ", " +
                    "\"" + email + "\"" + ", " +
                    "\"" + password + "\"" + ", " +
                    0 + ");";
            stmt.execute(query);
            connection.close();

            return "{\"status\":\"ok\",\"message\":\"User successfully created.\"}";

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\"A SQL error occured.\"}";
        } catch(Exception e){
            return "{\"status\":\"error\",\"message\":\"An unknown error occured.\"}";
        }
    }

}
