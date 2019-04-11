package edu.buffalo.cse442.handlers;

import java.sql.*;

public class DBActionHandler {

    private static String connectionString;
    private static String dbUser;
    private static String dbPassword;

    public DBActionHandler(String con, String un, String pw) {
        connectionString = con;
        dbUser = un;
        dbPassword = pw;
    }

    public Connection openDBConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection =  DriverManager.getConnection(connectionString + "?serverTimezone=UTC", dbUser, dbPassword);
            return connection;
        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
            return null;
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
            return null;
        } catch(Exception e){
            System.out.println(e);
            return null;
        }
    }

    public Connection openDBConnection(String dbName) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection =  DriverManager.getConnection(connectionString + "/" + dbName + "?serverTimezone=UTC", dbUser, dbPassword);
            return connection;
        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
            return null;
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
            return null;
        } catch(Exception e){
            System.out.println(e);
            return null;
        }
    }

    public void createDB() {
        try {
            Connection connection =  openDBConnection();
            Statement stmt= connection.createStatement();
            String query = "CREATE DATABASE IF NOT EXISTS debateapp";
            stmt.execute(query);

            System.out.println("Database created!");
            connection.close();

        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }

    }

    public void createUserTable() {
        try {
            Connection connection = openDBConnection("debateapp");
            Statement stmt= connection.createStatement();
            String query = "CREATE TABLE IF NOT EXISTS Users (" +
                    "  `Id` INT NOT NULL AUTO_INCREMENT," +
                    "  `FirstName` VARCHAR(45) NOT NULL," +
                    "  `LastName` VARCHAR(45) NOT NULL," +
                    "  `UserName` VARCHAR(64) NOT NULL," +
                    "  `Email` VARCHAR(45) NOT NULL," +
                    "  `EncryptedPassword` VARCHAR(64) NOT NULL," +
                    "  `UserLevel` INT NOT NULL," +
                    "  PRIMARY KEY (`Id`)" +
                    ");";
            stmt.execute(query);

            System.out.println("User Table created!");
            connection.close();

        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }

    public void createDebateTable() {
        try {
            Connection connection = openDBConnection("debateapp");
            Statement stmt= connection.createStatement();
            String query = "CREATE TABLE IF NOT EXISTS Debates (" +
                    "  `Id` INT NOT NULL AUTO_INCREMENT," +
                    "  `OwnerID` INT NOT NULL,"+
                    "  `Open` INT NOT NULL," +
                    "  `Public` INT NOT NULL," +
                    "  `Title` VARCHAR(100) NOT NULL," +
                    "  `SideATitle` VARCHAR(100) NOT NULL," +
                    "  `SideBTitle` VARCHAR(100) NOT NULL," +
                    "  `Summary` VARCHAR(500) NOT NULL," +
                    "  PRIMARY KEY (`Id`));";
            stmt.execute(query);

            System.out.println("Debate Table created!");
            connection.close();

        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }
    public void createCommentTable() {
        try {
            Connection connection = openDBConnection("debateapp");
            Statement stmt= connection.createStatement();
            String query = "CREATE TABLE IF NOT EXISTS Comment (" +
                    "  `Id` INT NOT NULL AUTO_INCREMENT," +
                    "  `DebateID` INT NOT NULL," +
                    "  `CommentDateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL," +
                    "  `Comment` VARCHAR(500) NOT NULL," +
                    "  `UserID` INT NOT NULL," +
                    "  `Side` VARCHAR(1) NOT NULL,"+
                    "   PRIMARY KEY (`Id`));";
            stmt.execute(query);

            System.out.println("Comment Table created!");
            connection.close();

        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }

    public void createUserOpinionTable() {
        try {
            Connection connection = openDBConnection("debateapp");
            Statement stmt= connection.createStatement();
            String query = "CREATE TABLE IF NOT EXISTS UserOpinion (" +
                    "  `Id` INT NOT NULL," +
                    "  `DebateID` INT NOT NULL," +
                    "  `UserID` INT NOT NULL," +
                    "  `Side` VARCHAR(1) NOT NULL,"+
                    "   PRIMARY KEY (`Id`));";
            stmt.execute(query);

            System.out.println("Opinion Table created!");
            connection.close();

        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        } catch(Exception e){
            System.out.println(e);
        }
    }

    //Todo : Anu
    public void createUserOpinion(int debateID,int userid,char side) {
         try {
             Connection connection = openDBConnection("debateapp");
             Statement stmt= connection.createStatement();
             String query = "INSERT INTO UserOpinion (" +
                    " `DebateID`, `UserID`, `Side`) Values (" +
                    "\"" + debateID + "\"" + ", " +
                    "\"" + userid + "\"" + ", " +
                    "\"" + side + "\"" + " );";
             stmt.execute(query);
             System.out.println("Comment Created!");
             connection.close();

         } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
         } catch(Exception e){
            System.out.println(e);
         }
    }
}
