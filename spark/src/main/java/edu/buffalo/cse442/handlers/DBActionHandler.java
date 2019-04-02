package edu.buffalo.cse442.handlers;

import java.sql.*;

public class DBActionHandler {
    public void createDB() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306","root", "1234");

            Statement stmt= connection.createStatement();
            String query = "CREATE DATABASE IF NOT EXISTS DEBATEAPP";
            stmt.execute(query);

            System.out.println("Database created!");
            connection.close();

        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }

    }

    public void createUserTable() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/debateapp","root", "1234");;

            Statement stmt= connection.createStatement();
            String query = "CREATE TABLE IF NOT EXISTS `DEBATEAPP`.`Users` (" +
                    "  `Id` INT NOT NULL AUTO_INCREMENT," +
                    "  `FirstName` VARCHAR(45) NOT NULL," +
                    "  `LastName` VARCHAR(45) NOT NULL," +
                    "  `UserName` VARCHAR(45) NOT NULL," +
                    "  `Email` VARCHAR(45) NOT NULL," +
                    "  `EncryptedPassword` VARCHAR(45) NOT NULL," +
                    "  `UserLevel` INT NOT NULL," +
                    "  PRIMARY KEY (`Id`));";
            //            System.out.println(query);
            stmt.execute(query);

            System.out.println("User Table created!");
            connection.close();

        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }

    public void createDebateTable() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/debateapp","root", "1234");;

            Statement stmt= connection.createStatement();
            String query = "CREATE TABLE IF NOT EXISTS `DEBATEAPP`.`Debate` (" +
                    "  `Id` INT NOT NULL AUTO_INCREMENT," +
                    "  `OwnerID` INT NOT NULL,"+
                    "  `Open` INT NOT NULL," +
                    "  `Public` INT NOT NULL," +
                    "  `Title` VARCHAR(100) NOT NULL," +
                    "  `ViewDebate` VARCHAR(100) NOT NULL," +
                    "  `ParticipateAtDebate` VARCHAR(100) NOT NULL," +
                    "  `SideATitle` VARCHAR(100) NOT NULL," +
                    "  `SideACommentID` INT NOT NULL," +
                    "  `SideBTitle` VARCHAR(100) NOT NULL," +
                    "  `SideBCommentID` INT NOT NULL," +
                    "  `Summary` VARCHAR(500) NOT NULL," +
                    "  `LastCommentDateTime` TIMESTAMP," +
                    "  CONSTRAINT contacts_unique UNIQUE (`SideACommentID`, `SideBCommentID`)," +
                    "  PRIMARY KEY (`Id`));";
            //            System.out.println(query);
            stmt.execute(query);

            System.out.println("Debate Table created!");
            connection.close();

        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }
    public void createCommentTable() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/debateapp","root", "1234");;

            Statement stmt= connection.createStatement();
            String query = "CREATE TABLE IF NOT EXISTS `DEBATEAPP`.`Comment` (" +
                    "  `Id` INT NOT NULL," +
                    "  `DebateID` INT NOT NULL," +
                    "  `CommentDateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL," +
                    "  `Comment` VARCHAR(500) NOT NULL," +
                    "  `UserID` INT NOT NULL," +
                    "  `Side` VARCHAR(1) NOT NULL,"+
                    "   PRIMARY KEY (`Id`));";
            //            System.out.println(query);
            stmt.execute(query);

            System.out.println("Comment Table created!");
            connection.close();

        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }

    public void createUserOpinionTable() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/debateapp","root", "1234");;

            Statement stmt= connection.createStatement();
            String query = "CREATE TABLE IF NOT EXISTS `DEBATEAPP`.`UserOpinion` (" +
                    "  `Id` INT NOT NULL," +
                    "  `DebateID` INT NOT NULL," +
                    "  `UserID` INT NOT NULL," +
                    "  `Side` VARCHAR(1) NOT NULL,"+
                    "   PRIMARY KEY (`Id`));";
//                        System.out.println(query);
            stmt.execute(query);

            System.out.println("Opinion Table created!");
            connection.close();

        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }

    //Todo : Mert
    public void createUser(String firstName, String lastName, String userName, String email, String password, int userLevel) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/debateapp","root", "1234");;

            Statement stmt= connection.createStatement();
            String query = "INSERT INTO `DEBATEAPP`.`Users` (" +
                    " `FirstName`, `LastName`, `UserName`, `Email`, `EncryptedPassword`, `UserLevel`) Values (" +
                    "\"" + firstName + "\"" + ", " +
                    "\"" + lastName + "\"" + ", " +
                    "\"" + userName + "\"" + ", " +
                    "\"" + email + "\"" + ", " +
                    "\"" + password + "\"" + ", " +
                    userLevel + ");";

//            System.out.println(query);
            stmt.execute(query);

            System.out.println("User Created!");
            connection.close();

        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }

    //Todo : Mert
    public void createDebate(String userName, int open, int _public, String Title, String ViewDebate, String ParticipateAtDebate, String SideATitle, String SideBTitle, String Summary) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/debateapp","root", "1234");;

            Statement stmt= connection.createStatement();
            String query = "select count(*) from debateapp.debate;";
            ResultSet rs = stmt.executeQuery(query);

            int id = 0;
            while(rs.next()) {
                id = rs.getInt("count(*)") + 1;
            }
            System.out.println("ID " + id);
            int sideACommentID = id*id;
            int sideBCommentID = (id*id) + 1;

            query = "select id from debateapp.users where userName = '" + userName+ "';";
            rs = stmt.executeQuery(query);

            int ownerId = 0;
            while(rs.next()) {
                ownerId = rs.getInt("id");
            }

            System.out.println("idUserName " + ownerId);

            query = "INSERT INTO `DEBATEAPP`.`Debate` (OwnerID, Open, Public, Title, ViewDebate, ParticipateAtDebate, SideATitle, SideACommentID, SideBTitle, SideBCommentID, Summary) Values (" +
                    ownerId + ", " + open + ", " + _public + ", " +
                    "\"" + Title + "\"," +
                    "\"" + ViewDebate + "\"," +
                    "\"" + ParticipateAtDebate + "\"," +
                    "\"" + SideATitle + "\"," +
                    sideACommentID + "," +
                    "\"" + SideBTitle + "\"," +
                    sideBCommentID + "," +
                    "\"" + Summary + "\"" +
                    ");";

//            System.out.println(query);
            stmt.execute(query);

            System.out.println("Debate Created!");
            connection.close();

        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }

    //Todo : Anu
    public void createComment(int debateiD,string datetime,string comment,int userid,char side)
    {
           try 
           {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/debateapp","root", "1234");;

            Statement stmt= connection.createStatement();
            String query = "INSERT INTO `DEBATEAPP`.`Comments` (" +
                    " `DebateID`, `CommentDateTime`, `Comment`, `UserID`, `Side`) Values (" +
                    "\"" + debateID + "\"" + ", " +
                    "\"" + datetime + "\"" + ", " +
                    "\"" + comment + "\"" + ", " +
                    "\"" + userid + "\"" + ", " +
                    "\"" + side + "\"" );";

//            System.out.println(query);
            stmt.execute(query);

            System.out.println("Comment Created!");
            connection.close();

           } 
        catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }

    //Todo : Anu
    public void createUserOpinion(int debateid,int userid,char side) 
    {
         try 
           {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/debateapp","root", "1234");;

            Statement stmt= connection.createStatement();
            String query = "INSERT INTO `DEBATEAPP`.`UserOpinion` (" +
                    " `DebateID`, `UserID`, `Side`) Values (" +
                    "\"" + debateID + "\"" + ", " +
                    "\"" + userid + "\"" + ", " +
                    "\"" + side + "\"" + " );";

//            System.out.println(query);
            stmt.execute(query);

            System.out.println("Comment Created!");
            connection.close();

           } 
         catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }
}
