package edu.buffalo.cse442;

class PasswordException extends Exception {
    String message;

    public PasswordException(String m) {
        message = m;
    }

    public String toString() {
        return "PasswordException[" + message + "]";
    }
}
