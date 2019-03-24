package edu.buffalo.cse442.handlers;

public class UserHandler {

    /**
     * This method should be called in response to a put request
     * to the server and should log the user in.
     * @param username The username of the user attempting to log in.
     * @param password The password of the user attempting to log in.
     * @return A JSON String containing status info about the login attempt.
     */
    public String login(String username, String password) {
        /** TODO Implement login in PUT request handler. */
        return "{\n" +
                "   \"status\":\"ok\",\n" +
                "   \"status_message\":\"Valid Login\",\n" +
                "   \"userid\":1\n" +
                "}";
    }

    /**
     * This method should register a new user with the specified details.
     * The parameters are TBD.
     * @return A JSON String containing status info about the register attempt.
     */
    public String register() {
        // Parameters TBD.
        /** TODO Implement the register POST request handler. */
        return "{\n" +
                "        \"status\":\"ok\",\n" +
                "        \"status_message\": \"ok\",\n" +
                "        \"userid\":1\n" +
                "}";
    }

}
