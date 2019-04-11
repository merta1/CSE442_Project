package edu.buffalo.cse442.handlers;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserHandlerTest {

    /** Create the fake data and salt that we will use during testing. */
    private final static String
        SALT =  "ABC123ABC123ABC123",
        CONNECTION = "thisisaconnectionstring",
        DB_USERNAME = "username",
        DB_PASSWORD = "POOP",
        TEST_USERNAME = "ohmygodkillme",
        TEST_PASSWORD = "CsGetDegrees",
        FIRST_NAME = "William M.",
        LAST_NAME = "Buttlicker",
        EMAIL = "IMightDieBeforeTheSemesterEnds@gmail.com";

    /** This is the actual UserHandler object we will be testing. */
    private UserHandler handler;

    /** These are all objects that the UserHandler uses to communicate with
     *  the database. We will be mocking these to avoid real DB connections.
     */
    @Mock
    DBActionHandler database;
    @Mock
    private Connection mockConnection;
    @Mock
    private PreparedStatement mockStatement;
    @Mock
    private PreparedStatement mockStatement2;
    @Mock
    private ResultSet mockResult;
    @Mock
    private ResultSet mockEmptyResult;

    @BeforeAll
    void setup() throws SQLException {
        MockitoAnnotations.initMocks(this);

        // Inject our fake database connection into the UserHandler we will be testing.
        handler = new UserHandler(SALT, CONNECTION, DB_USERNAME, DB_PASSWORD) {
            @Override
            protected DBActionHandler createActionHandler(String con, String un, String pw) {
                return database;
            }
        };

        // When the database tries to make a connection, return a fake connection.
        when(database.openDBConnection(anyString())).thenReturn(mockConnection);

        // Our fake connection will return a fake statement.
        when(mockConnection.prepareStatement(anyString())).thenReturn(mockStatement);

        when(mockEmptyResult.next()).thenReturn(false);
        when(mockResult.next()).thenReturn(true);
    }

    @Test
    public void testLoginFailure() throws SQLException {
        when(mockStatement.executeQuery()).thenReturn(mockEmptyResult);

        String result = handler.login(TEST_USERNAME, TEST_PASSWORD);
        assertTrue(result.startsWith("{\"status\":\"error\""));
    }

    @Test
    public void testLoginSuccess() throws SQLException {
        when(mockStatement.executeQuery()).thenReturn(mockResult);

        try {
            String result = handler.login(TEST_USERNAME, TEST_PASSWORD);
            assertTrue(result.startsWith("{\"status\":\"ok\""));
            verify(mockStatement, times(1))
                    .setString(1, TEST_USERNAME);
        } catch (Exception e) {
            throw e;
        }
    }

    @Test
    public void testRegisterUserAlreadyExists() throws SQLException {
        // Return true so that when they query for a username it has a result.
        when(mockConnection.prepareStatement(anyString()))
                .thenReturn(mockStatement);
        when(mockStatement.executeQuery())
                .thenReturn(mockResult);

        String result = handler.register(FIRST_NAME, LAST_NAME, EMAIL, TEST_PASSWORD, TEST_USERNAME);
        assertTrue(result.contains("error"));
    }

    @Test
    public void testRegisterSuccess() throws SQLException {
        // Return true so that when they query for a username it has no results.
        when(mockConnection.prepareStatement(startsWith("SELECT")))
                .thenReturn(mockStatement);
        when(mockStatement.executeQuery())
                .thenReturn(mockEmptyResult);

        // When they try to insert the user into the database return success.
        when(mockConnection.prepareStatement(startsWith("INSERT"), anyInt()))
                .thenReturn(mockStatement2);
        when(mockStatement2.executeQuery())
                .thenReturn(mockResult);

        when(mockStatement2.getGeneratedKeys()).thenReturn(mockResult);

        String result = handler.register(FIRST_NAME, LAST_NAME, EMAIL, TEST_PASSWORD, TEST_USERNAME);
        assertTrue(result.startsWith("{\"status\":\"ok\""));
    }
}
