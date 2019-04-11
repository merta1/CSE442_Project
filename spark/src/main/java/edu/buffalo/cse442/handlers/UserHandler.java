package edu.buffalo.cse442.handlers;

import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import org.apache.commons.codec.binary.Hex;

public class UserHandler {

    private DBActionHandler db;
    private String password_salt;


    public UserHandler(String salt,String con, String un, String pw) {
        db = createActionHandler(con, un, pw);
        password_salt = salt;
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

        String sha256hex;

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String pwsalt = password + password_salt;
            byte[] hash = digest.digest(pwsalt.getBytes(StandardCharsets.UTF_8));
            sha256hex = new String(Hex.encodeHex(hash));
        } catch (NoSuchAlgorithmException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }

        try {
            Connection connection = db.openDBConnection("debateapp");

            PreparedStatement checkLogin = connection.prepareStatement(
                    "SELECT * FROM Users WHERE (Username = ? OR Email = ?) AND EncryptedPassword = ?");

            checkLogin.setString(1,username);
            checkLogin.setString(2,username);
            checkLogin.setString(3,sha256hex);
            ResultSet rs = checkLogin.executeQuery();

            if (rs.next()) {
                return "{\"status\":\"ok\",\"message\":\"Valid Login.\",\"userid\":\""+rs.getInt("Id")+"\",\"username\":\""+rs.getString("UserName")+"\",\"email\":\""+rs.getString("email")+"\"}";
            } else {
                connection.close();
                throw new SQLException("Login Incorrect");
            }

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }

    }

    /**
     * This method should register a new user with the specified details.
     * The parameters are TBD.
     * @return A JSON String containing status info about the register attempt.
     */
    public String register(String firstname, String lastname, String email, String password, String username) {

        //TODO: we need to check to see if the user is already registered and return an error message if they are.

        int userid;
        String query;
        ResultSet rs;
        String sha256hex;

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String pwsalt = password + password_salt;
            byte[] hash = digest.digest(pwsalt.getBytes(StandardCharsets.UTF_8));
            sha256hex = new String(Hex.encodeHex(hash));
        } catch (NoSuchAlgorithmException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }

        try {
            Connection connection = db.openDBConnection("debateapp");

            PreparedStatement checkUsername = connection.prepareStatement(
                    "SELECT * FROM Users WHERE Username = ?");

            checkUsername.setString(1,username);
            rs = checkUsername.executeQuery();

            if (rs.next()) {
                connection.close();
                throw new SQLException("Username already exists.");
            }

            PreparedStatement checkEmail = connection.prepareStatement(
                    "SELECT * FROM Users WHERE Email = ?");

            checkEmail.setString(1,email);
            rs = checkEmail.executeQuery();

            if (rs.next()) {
                connection.close();
                throw new SQLException("Email already exists.");
            }

            PreparedStatement registerUser = connection.prepareStatement(
                    "INSERT INTO Users (FirstName, LastName, UserName, Email, EncryptedPassword, UserLevel) Values (?,?,?,?,?,0)", Statement.RETURN_GENERATED_KEYS);

            registerUser.setString(1,firstname);
            registerUser.setString(2,lastname);
            registerUser.setString(3,username);
            registerUser.setString(4,email);
            registerUser.setString(5,sha256hex);
            registerUser.executeUpdate();

            ResultSet generatedKeys = registerUser.getGeneratedKeys();
            if (generatedKeys.next()) {
                userid = generatedKeys.getInt(1);
            } else {
                connection.close();
                throw new SQLException("Unable to create user.");
            }

            connection.close();

            return "{\"status\":\"ok\",\"message\":\"User successfully created.\",\"userid\":\""+userid+"\",\"username\":\""+username+"\",\"email\":\""+email+"\"}";

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        } 
    }

    protected DBActionHandler createActionHandler(String con, String un, String pw) {
        return new DBActionHandler(con, un, pw);
    }
}
