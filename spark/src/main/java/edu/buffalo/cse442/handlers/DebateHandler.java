package edu.buffalo.cse442.handlers;

import org.apache.commons.text.StringEscapeUtils;

import java.sql.*;

public class DebateHandler {

    private DBActionHandler db;


    public DebateHandler(String con, String un, String pw) {
        db = createActionHandler(con, un, pw);
    }

    /**
     * Create a debate in response to a POST request.
     * The parameters are TBD.
     *
     * @return The debate's details, the same as if you
     * had requested the details of that debate's ID.
     */
   public String createDebate(int ownerid,int open, int publicity,String title,String SideA,String SideB,String summary)
   {
     
        
        SideA = StringEscapeUtils.escapeHtml4(SideA);
        SideB = StringEscapeUtils.escapeHtml4(SideB);
        summary = StringEscapeUtils.escapeHtml4(summary);
      
       int debateid;
       String query;
       ResultSet rs;
       try {
           Connection connection = db.openDBConnection("debateapp");

           PreparedStatement debatecreation = connection.prepareStatement(
                   "INSERT INTO Debates (OwnerID, Open, Public , Title, SideATitle, SideBTitle,Summary) Values (?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
           debatecreation.setInt(1, ownerid);
           debatecreation.setInt(2,open);
           debatecreation.setInt(3, publicity);
           debatecreation.setString(4, title);
           debatecreation.setString(5, SideA);
           debatecreation.setString(6, SideB);
           debatecreation.setString(7,summary);
           ;

           debatecreation.executeUpdate();
           ResultSet generatedKeys = debatecreation.getGeneratedKeys();
           if (generatedKeys.next()) {
               debateid = generatedKeys.getInt(1);
           } else {
               connection.close();
               throw new SQLException("Unable to create debate");
           }
           connection.close();

           return "{\"status\" : \"ok\" ,\"debateID\" : \""+debateid+"\"}";
       }
       catch (SQLException e)
       {
           return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
       }
       catch (Exception e)
       {
           return "{\"status\":\"error\",\"message\":\""+e.getMessage()+"\"}";
       }
   }

    /**
     * @param query The String to search for.
     * @return A list of debates matching the query String.
     */
    public String search(String query) {
        /**
         * TODO Implement searching debates
         */

        //Sanitize the input string of query
        query = StringEscapeUtils.escapeHtml4(query);

        return "{\n" +
                "        \"1\":{\"id\":146,\"debateName\":\"Do you think CSE is a good program?\",\"createdDate\":\"Feb 18, 2019 1:00pm\",\"activeUsers\":5},\n" +
                "        \"2\":{\"id\":32546,\"debateName\":\"Is AI Dangerous?\",\"createdDate\":\"Feb 18, 2019 1:05pm\",\"activeUsers\":16},\n" +
                "        \"3\":{\"id\":72356,\"debateName\":\"What do you think of pizza?\",\"createdDate\":\"Feb 18, 2019 1:30pm\",\"activeUsers\":320},\n" +
                "        \"4\":{\"id\":5426788,\"debateName\":\"Is this the best app ever created in the history of apps?\",\"createdDate\":\"Feb 18, 2019 3:00pm\",\"activeUsers\":4}\n" +
                "}";
    }

    /**
     * @param id The id of the debate you would like the details of.
     * @return The details of the debate with the specified id.
     */
    public String get(int id) {

        try {
            Connection connection = db.openDBConnection("debateapp");

            PreparedStatement getDebate = connection.prepareStatement(
                    "SELECT * FROM Debates WHERE ID = ?");

            getDebate.setInt(1, id);
            ResultSet rs = getDebate.executeQuery();

            if (rs.next()) {

                String json = "{" +
                        "\"status\":\"ok\"," +
                        "\"question\":\"" + rs.getString("Title") + "\"," +
                        "\"public\":\"" + rs.getInt("public") + "\"," +
                        "\"open\":\"" + rs.getInt("open") + "\"," +
                        "\"debateid\":" + rs.getInt("Id") + ",";

                PreparedStatement getComments = connection.prepareStatement(
                        "SELECT Comment.*, Comment.Id as cid, Users.UserName as Username FROM Comment LEFT JOIN Users ON Comment.UserID = Users.Id WHERE DebateID = ?");

                getComments.setInt(1, id);
                ResultSet rsComments = getComments.executeQuery();

                int rowCount = 0;
                int leftCount = 0;
                int rightCount = 0;
                String leftJson = "";
                String rightJson = "";
                while (rsComments.next())
                {
                    rowCount++;
                    if (rsComments.getString("Side").equals("A")) {
                        leftCount++;
                        leftJson += "\"" + rsComments.getInt("cid") + "\":{" +
                                "\"Comment\":\"" + rsComments.getString("Comment") + "\"," +
                                "\"CommentTime\":\"" + rsComments.getString("CommentDateTime") + "\"," +
                                "\"UserName\":\"" + rsComments.getString("UserName") + "\"," +
                                "\"UserId\":\"" + rsComments.getInt("UserID") + "\"" +
                                "},";
                    } else {
                        rightCount++;
                        rightJson += "\"" + rsComments.getInt("cid") + "\":{" +
                                "\"Comment\":\"" + rsComments.getString("Comment") + "\"," +
                                "\"CommentTime\":\"" + rsComments.getString("CommentDateTime") + "\"," +
                                "\"UserName\":\"" + rsComments.getString("UserName") + "\"," +
                                "\"UserId\":\"" + rsComments.getInt("UserID") + "\"" +
                                "},";
                    }
                }

                if (leftJson != null && leftJson.length() > 0 && leftJson.charAt(leftJson.length() - 1) == ',') {
                    leftJson = leftJson.substring(0, leftJson.length() - 1);
                }
                if (rightJson != null && rightJson.length() > 0 && rightJson.charAt(rightJson.length() - 1) == ',') {
                    rightJson = rightJson.substring(0, rightJson.length() - 1);
                }
                System.out.println(leftJson);
                System.out.println(rightJson);


                json += "\"totalcomments\":" + rowCount + "," +
                        "\"agree\":{" +
                        "   \"displaytext\":\"" + rs.getString("SideATitle") + "\"," +
                        "   \"usercount\":2," +
                        "   \"commentcount\":" + leftCount + "," +
                        "   \"comments\":{" + leftJson +
                        "   }" +
                        "}," +
                        "\"disagree\":{" +
                        "   \"displaytext\":\"" + rs.getString("SideBTitle") + "\"," +
                        "   \"usercount\":2," +
                        "   \"commentcount\":" + rightCount + "," +
                        "   \"comments\":{" + rightJson +
                        "   }" +
                        "}" +
                        "}";

                return json;

                //return "{\"status\":\"ok\",\"message\":\"Valid Login.\",\"userid\":\""+rs.getInt("Id")+"\",\"username\":\""+rs.getString("UserName")+"\",\"email\":\""+rs.getString("email")+"\"}";
            } else {
                connection.close();
                throw new SQLException("Invalid Debate ID");
            }

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}";
        }
    }


    /**
     * @return a list of the most active debates.
     */
    public String getActive() {
        /** TODO Implement GET handler to return active debates. */
        return "{\n" +
                "        \"2\":{\"id\":2,\"debateName\":\"Do you think CSE is a good program?\",\"createdDate\":\"Feb 18, 2019 1:00pm\",\"activeUsers\":5},\n" +
                "        \"3\":{\"id\":3,\"debateName\":\"Is AI Dangerous?\",\"createdDate\":\"Feb 18, 2019 1:05pm\",\"activeUsers\":16},\n" +
                "        \"4\":{\"id\":4,\"debateName\":\"Is this the best app ever created in the history of apps?\",\"createdDate\":\"Feb 18, 2019 3:00pm\",\"activeUsers\":4}\n" +
                "}";
    }

    /**
     * @return a list of the most controversial debates.
     */
    public String getControversial() {
        /** TODO Implement GET handler for returning contoversial debates. */
        return "{\n" +
                "        \"2\":{\"id\":2,\"debateName\":\"Do you think CSE is a good program?\",\"createdDate\":\"Feb 18, 2019 1:00pm\",\"activeUsers\":5},\n" +
                "        \"3\":{\"id\":3,\"debateName\":\"Is AI Dangerous?\",\"createdDate\":\"Feb 18, 2019 1:05pm\",\"activeUsers\":16},\n" +
                "        \"4\":{\"id\":4,\"debateName\":\"Is this the best app ever created in the history of apps?\",\"createdDate\":\"Feb 18, 2019 3:00pm\",\"activeUsers\":4}\n" +
                "}";
    }

    public String getDebatesCreatedBy(int userID) {
        /** TODO Implement GET handler for returning debates created by a particular user. */
        return "{\n" +
                "        \"2\":{\"id\":2,\"debateName\":\"Do you think CSE is a good program?\",\"createdDate\":\"Feb 18, 2019 1:00pm\",\"activeUsers\":5},\n" +
                "        \"3\":{\"id\":3,\"debateName\":\"Is AI Dangerous?\",\"createdDate\":\"Feb 18, 2019 1:05pm\",\"activeUsers\":16},\n" +
                "        \"4\":{\"id\":4,\"debateName\":\"Is this the best app ever created in the history of apps?\",\"createdDate\":\"Feb 18, 2019 3:00pm\",\"activeUsers\":4}\n" +
                "}";
    }

    /**
     * @return a list of the most popular debates.
     */
    public String getPopularDebates() {
        /** TODO Implement GET handler for requesting popular debates. */
        return "{\n" +
                "        \"2\":{\"id\":2,\"debateName\":\"Do you think CSE is a good program?\",\"createdDate\":\"Feb 18, 2019 1:00pm\",\"activeUsers\":5},\n" +
                "        \"3\":{\"id\":3,\"debateName\":\"Is AI Dangerous?\",\"createdDate\":\"Feb 18, 2019 1:05pm\",\"activeUsers\":16},\n" +
                "        \"4\":{\"id\":4,\"debateName\":\"Is this the best app ever created in the history of apps?\",\"createdDate\":\"Feb 18, 2019 3:00pm\",\"activeUsers\":4}\n" +
                "}";
    }

    /**
     * @return a list of the most recent debates.
     */
    public String getRecentDebates() {
        try {
            Connection connection = db.openDBConnection("debateapp");

            PreparedStatement getDebate = connection.prepareStatement(
                    "SELECT * FROM Debates WHERE Public = 1 ORDER BY Id DESC");

            ResultSet rs = getDebate.executeQuery();

            String json = "{";

            while (rs.next()) {

                json += "\"" + rs.getInt("Id") + "\":{\"id\":\""+rs.getInt("Id")+"\",\"debateName\":\""+rs.getString("Title")+"\",\"createdDate\":\"Feb 18, 2019 1:00pm\",\"activeUsers\":5},";

            }

            if (json != null && json.length() > 0 && json.charAt(json.length() - 1) == ',') {
                json = json.substring(0, json.length() - 1);
            }

            json += "}";

            if (json.equals("{}")) {
                throw new SQLException("No debates found.");
            }

            return json;

        } catch (SQLException e) {
            return "{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}";
        }
    }

    protected DBActionHandler createActionHandler(String con, String un, String pw) {
        return new DBActionHandler(con, un, pw);
    }
}