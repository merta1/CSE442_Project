package edu.buffalo.cse442.handlers;

import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import edu.buffalo.cse442.Main;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.text.StringEscapeUtils;

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

        //Sanitize the input string of username and password
        username = StringEscapeUtils.escapeHtml4(username);
        password = StringEscapeUtils.escapeHtml4(password);

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

        //Sanitize the input string of firstname, lastname, email, username, and password
        firstname = StringEscapeUtils.escapeHtml4(firstname);
        lastname = StringEscapeUtils.escapeHtml4(lastname);
        email = StringEscapeUtils.escapeHtml4(email);
        username = StringEscapeUtils.escapeHtml4(username);
        password = StringEscapeUtils.escapeHtml4(password);

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
            if (password.length() < 8) {
                throw new PasswordException("Password does not meet minimum length requirement.");
            }
            //do more validation!

        } catch (PasswordException e) {
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

    public String setSide(int userid, int debateid, String side) {
        try {
            Connection connection = db.openDBConnection("debateapp");

            PreparedStatement addComment = connection.prepareStatement(
                    "INSERT INTO `debateapp`.`useropinion`\n" +
                            "(`DebateID`,\n" +
                            "`UserID`,\n" +
                            "`Side`)\n" +
                            "VALUES\n" +
                            "(?,\n" +
                            "?,\n" +
                            "?);");

            addComment.setInt(1, debateid);
            addComment.setInt(2, userid);
            addComment.setString(3, side);
            addComment.executeUpdate();

            return "{\"status\":\"ok\",\"message\":\"Side "+side+"chosen.\"}";

        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }
    }

    public String getSide(int userid, int debateid) {
        try {
            Connection connection = db.openDBConnection("debateapp");

            PreparedStatement getDebate = connection.prepareStatement(
                    "SELECT * FROM useropinion WHERE UserID = ? AND DebateID = ?");

            getDebate.setInt(1, userid);
            getDebate.setInt(2, debateid);
            ResultSet rs = getDebate.executeQuery();

            if (rs.next()) {
                return "{\"status\":\"ok\",\"message\":\"" + rs.getString("Side") + "\"}";
            } else {
                return "{\"status\":\"ok\",\"message\":\"N\"}";
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }
    }

    /**
     * This method should generate a one-time use link that is emailed to a user.
     *
     * When they click the link it should take them to a page to actually choose a new password.
     *
     *
     * The parameters are TBD.
     * @return A JSON String containing status info about the register attempt.
     */
    public String forgotPassword(String email, String domain) {

        int userid;
        String query;
        ResultSet rs;
        String sha256hex;

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String pwsalt = email + password_salt + System.currentTimeMillis();
            byte[] hash = digest.digest(pwsalt.getBytes(StandardCharsets.UTF_8));
            sha256hex = new String(Hex.encodeHex(hash)); //this is a hash we can use for a one time use URL
        } catch (NoSuchAlgorithmException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }

        try {
            Connection connection = db.openDBConnection("debateapp");

            PreparedStatement checkUsername = connection.prepareStatement(
                    "SELECT * FROM Users WHERE Email = ?");

            checkUsername.setString(1,email);
            rs = checkUsername.executeQuery();

            if (!rs.next()) {
                connection.close();
                throw new SQLException("Email Address does not exist.");
            }

            PreparedStatement resetPassword = connection.prepareStatement(
                    "INSERT INTO UserChanges (Email, EncryptedPassword, Type) VALUES (?,?, 1)",Statement.RETURN_GENERATED_KEYS);

            resetPassword.setString(1,email);
            resetPassword.setString(2,sha256hex);
            resetPassword.executeUpdate();

            ResultSet generatedKeys = resetPassword.getGeneratedKeys();
            if (generatedKeys.next()) {
                int id = generatedKeys.getInt(1);
            } else {
                connection.close();
                throw new SQLException("An unknown error has occured.");
            }

            connection.close();

            //send an email to the user!
            String resetLink = domain + "/#/resetPassword/" + sha256hex;

            String emailBody = "Please click on the link below to reset your password.  This link is only good for 24 hours." +
                    "<br><br><a href=\""+resetLink+"\">Reset Password</a><br><br> If the above link does not work, copy and " +
                    "paste this link into your browser window.<br>" + resetLink;

            String msg = Main.sendEmail(email, "Reset Password Request from "+domain, emailBody);

            return msg;

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }
    }

    public String resetPassword(String token) {
        try {
            ResultSet rs;
            String email;
            Connection connection = db.openDBConnection("debateapp");

            PreparedStatement checkKey = connection.prepareStatement(
                    "SELECT * FROM UserChanges WHERE EncryptedPassword = ? AND TYPE=1 AND SUBDATE(CURRENT_DATE(), INTERVAL 24 HOUR) <= RequestTime");

            checkKey.setString(1,token);
            rs = checkKey.executeQuery();

            if (!rs.next()) {
                connection.close();
                throw new SQLException("We are sorry, this URL is not valid.");
            }

            email = rs.getString("Email");

            connection.close();

            return "{\"status\":\"ok\",\"message\":\"Valid token found.\",\"email\":\""+email+"\"}";

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }
    }

    public String resetPassword(String token, String email, String password, String passwordConfirm) {

        try {
            if (!password.equals(passwordConfirm)) {
                throw new PasswordException("Passwords do not match.");
            }
            if (password.length() < 8) {
                throw new PasswordException("Password does not meet minimum length requirement.");
            }
            //do more validation!

        } catch (PasswordException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }


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
            ResultSet rs;
            Connection connection = db.openDBConnection("debateapp");

            //check the key one more time
            PreparedStatement checkKey = connection.prepareStatement(
                    "SELECT * FROM UserChanges WHERE EncryptedPassword = ? AND TYPE=1 AND SUBDATE(CURRENT_DATE(), INTERVAL 24 HOUR) <= RequestTime");

            checkKey.setString(1,token);
            rs = checkKey.executeQuery();

            if (!rs.next()) {
                connection.close();
                throw new SQLException("We are sorry, this URL is no longer valid.");
            }



            //insert the new password in the database
            PreparedStatement resetUserPW = connection.prepareStatement(
                    "UPDATE Users SET EncryptedPassword = ? WHERE Email = ?");

            resetUserPW.setString(1,sha256hex);
            resetUserPW.setString(2,email);
            resetUserPW.executeUpdate();


            // delete the key from UserChanges
            PreparedStatement deleteKey = connection.prepareStatement(
                    "DELETE FROM UserChanges WHERE EncryptedPassword = ? AND Type = 1");

            deleteKey.setString(1,token);
            deleteKey.executeUpdate();

            connection.close();

            return "{\"status\":\"ok\",\"message\":\"Password reset successful.\"}";

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }
    }

    protected DBActionHandler createActionHandler(String con, String un, String pw) {
        return new DBActionHandler(con, un, pw);
    }

    class PasswordException extends Exception {
        String message;

        public PasswordException(String m) {
            message = m;
        }

        public String getMessage() {
            return message;
        }

        public String toString() {
            return "PasswordException[" + message + "]";
        }
    }
}
