package edu.buffalo.cse442.handlers;

import java.sql.*;
import org.apache.commons.text.StringEscapeUtils;

public class CommentHandler {

    private DBActionHandler db;

    public CommentHandler(String con, String un, String pw) {

        db = new DBActionHandler(con, un, pw);

    }

    /**
     * Create a debate in response to a POST request.
     * The parameters are TBD.
     *
     * @return The debate's details, the same as if you
     * had requested the details of that debate's ID.
     */
    public String addComment(int userid, int debateid, String side, String comment) {

        int commentid;

        try {
            Connection connection = db.openDBConnection("debateapp");

            //Sanitize the input string of side and comment
            side = StringEscapeUtils.escapeHtml4(side);
            comment = StringEscapeUtils.escapeHtml4(comment);

            PreparedStatement addComment = connection.prepareStatement(
                    "INSERT INTO Comment (DebateID, UserID, Comment, Side) Values (?,?,?,?)", Statement.RETURN_GENERATED_KEYS);

            addComment.setInt(1,debateid);
            addComment.setInt(2,userid);
            addComment.setString(3,comment);
            addComment.setString(4,side);
            addComment.executeUpdate();

            ResultSet generatedKeys = addComment.getGeneratedKeys();
            if (generatedKeys.next()) {
                commentid = generatedKeys.getInt(1);
            } else {
                connection.close();
                throw new SQLException("Unable to add comment.");
            }

            connection.close();

            return "{\"status\":\"ok\",\"message\":\"Comment added.\",\"commentid\":\""+commentid+"\"}";

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
        }

    }


}