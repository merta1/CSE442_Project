package edu.buffalo.cse442.handlers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

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
                    "  `LastCommentDateTime` TIMESTAMP NOT NULL," +
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
            String query = "CREATE TABLE IF NOT EXISTS `DEBATEAPP`.`CommentTable` (" +
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
            String query = "CREATE TABLE IF NOT EXISTS `DEBATEAPP`.`useropiniontable` (" +
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

            System.out.println(query);
            stmt.execute(query);

            System.out.println("User Registered!");
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
    public void createDebate() {

    }

    //Todo : Anu
    public void createComment() {

    }

    //Todo : Anu
    public void createUserOpinion() {

    }
}
