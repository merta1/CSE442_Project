package edu.buffalo.cse442.handlers;

import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.*;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DebateHandlerTest {

    /** Create the fake data and salt that we will use during testing. */
    private final static String
            SALT =  "ABC123ABC123ABC123",
            CONNECTION = "thisisaconnectionstring",
            DB_USERNAME = "username",
            DB_PASSWORD = "POOP";


    /** This is the object that we will be testing. */
    private DebateHandler handler;
    @Mock
    private Connection mockConnection;
    @Mock
    private Statement mockStatement;
    @Mock
    private ResultSet mockResult;
    @Mock
    private ResultSet mockEmptyResult;

    /** These are all objects that the UserHandler uses to communicate with
     *  the database. We will be mocking these to avoid real DB connections.
     */
    @Mock
    DBActionHandler database;

    @BeforeAll
    void setup() throws SQLException {
        MockitoAnnotations.initMocks(this);

        // Inject our fake database connection into the UserHandler we will be testing.
        handler = new DebateHandler(CONNECTION, DB_USERNAME, DB_PASSWORD) {
            @Override
            protected DBActionHandler createActionHandler(String con, String un, String pw) {
                return database;
            }
        };

        // When the database tries to make a connection, return a fake connection.
        when(database.openDBConnection(anyString())).thenReturn(mockConnection);

        // Our fake connection will return a fake statement.
        when(mockConnection.createStatement()).thenReturn(mockStatement);

        when(mockEmptyResult.next()).thenReturn(false);
        when(mockResult.next()).thenReturn(true);
    }

    @Test
    void testCreateDebate() {
        String result = handler.createDebate("ABC", "ABC", 123, 123, "ABC",
                "ABC", "ABC");

        assertTrue(result.equals(""));
    }
}
