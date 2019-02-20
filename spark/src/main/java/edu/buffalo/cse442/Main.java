package edu.buffalo.cse442;

import static spark.Spark.*;

import org.apache.log4j.BasicConfigurator;

public class Main {
    public static void main(String[] args) {
    	BasicConfigurator.configure();
        get("/hello", (req, res) -> "Hello World");
    }
}
