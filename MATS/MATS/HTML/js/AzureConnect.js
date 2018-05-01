import {Connection, Request} from "tedious";

// Create connection to database
let config =
    {
        userName: 'mats@matsmain', // update me
        password: 'Path1234', // update me
        server: 'matsmain.database.windows.net', // update me
        options:
            {
                encrypt: true,
                database: 'mats_user' //update me
            }
    };

let connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            queryDatabase();
        }
    }
);

function queryDatabase()
{ console.log('Attempt Login');

    // Read all rows from table
    userName = 'Godvjghdsmode';
    password = 'Godmode';
    request = new Request("DECLARE @temp INT\n" +
        "EXEC DATA.userlogin "+userName+", "+ password +", @temp output\n" +
        "SELECT @temp\n",
        function(err, rowCount, rows)
        {
            
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if(column.value === 1)
            {
                console.log("Patient Log in successful");
            }
            else if (column.value === 2)
            {
                console.log("Caretaker Log in successful");
            }
            else
            {
                console.log("Invalid Password or Username");
            }
            process.exit();
        });
    });
    connection.execSql(request);
}