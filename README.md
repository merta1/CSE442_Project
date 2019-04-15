Debate Web Application

In this project, we are going to implement a debate application that runs on the web. The idea is coming from Professor Hartloff. In this application there will be essentially these features: Social media for debates, Users can submit statements for debate and everyone chooses to agree or disagree and discusses, The top arguments both for and against the statement are shown, Users are encouraged to consider both sides of debateS.

To build this web application these are the technologies we are planning to use: at the front-end HTML, CSS, JavaScript, and at the back-end Spark with Java by building a rest api and a MySQL backend.

User Acceptance Tests:
https://github.com/merta1/CSE442_Project/projects/1?card_filter_query=label%3A%22user+story%22

To run the app locally:

1. Install Maven. https://www.baeldung.com/install-maven-on-windows-linux-mac

2. Install NPM. https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/

3. Install MYSQL. https://dev.mysql.com/doc/refman/5.6/en/installing.html
    -Make sure to remember what root password you used!!

4. After you cloned the repo, go into the spark folder.  Create a file called config.properties.  It should have the format below.  Update the database username and password to match your mysql username and password.  Modify salt to be anything.

```#debate app properties
database.connectionString=jdbc:mysql://localhost:3306
database.username=root
database.password=password
password.salt=S;dcUk>/uRKTK;mC8g%(z%2B0n#C|m@~D#h zhD.WN8=m.c)gM+{j|V8H
```

5. From the spark folder type ```mvn clean install```.  This will build a jar file in the /spark/target/ folder.  Once it is finished run ```java -jar ./target/debate-app-1.0-jar-with-dependencies.jar``` to start the backend.  You have to leave this window open!  You should now have a running backend at http://localhost:4567/.  You can verify it is working by visiting http://localhost:4567/debates/recent.

6. We need to give the database some test data.  You can find a sample script in the spark folder called test.sql.  If you run ```mysql -u <USERNAME> -p < example.sql``` from the spark folder you will import some dummy data.

7. From the react directory run ```npm install```, then run ```npm start```.  You have to leave this window open!  Your browser should open to http://localhost:3000 automatically.  If it doesn't, just open a browser window and go to that URL.  You should now see the running React app!
