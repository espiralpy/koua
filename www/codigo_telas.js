//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS Products (id INTEGER PRIMARY KEY AUTOINCREMENT, product_name varchar(50), description varchar(150), price varchar(50), quantity varchar(50), category varchar(20), user_name varchar(50), email varchar(50), phone varchar(30), cellphone varchar(30), address varchar(150), id_user varchar(5), data TEXT, id_artesano INTEGER(5))";
 
var selectAllStatement = "SELECT * FROM Products WHERE category='Cloth'";
 
var insertStatement = "INSERT INTO Products (product_name, description, price, quantity, category, user_name, email, phone, cellphone, address, id_user, data, id_artesano) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
 
var updateStatement = "UPDATE Products SET product_name = ?, description = ?, price = ?, quantity=? WHERE id=?";
 
var deleteStatement = "DELETE FROM Products WHERE id=?";
 
var dropStatement = "DROP TABLE Products";
 
var db = openDatabase("ProductsBook", "2.0", "Products Book", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;

var onloadDone;
 
 function initDatabase()  // Function Call When Page is ready.
 
{
 
 //alert("Entro a crear la base de datos");
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            onloadDone = false;
            createTable();  // If supported then call Function for create table in SQLite
 
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}
 
function createTable()  // Function for Create Table in SQLite.
 
{
  //checar porque solo cuando se carga la pantalla se ejecuta dos veces la funcion show records y por eso muestra doble registro
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
 
}
 
function insertRecord(user_name, category, email, phone, cellphone, address, idd) // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{

        var product_nametemp = $('input:text[id=product_name]').val();
        var descriptiontemp = $('input:text[id=description]').val();
        var pricetemp = $('input:text[id=price]').val();
        var quantitytemp = $('input:text[id=quantity]').val();
        var user_name = user_name.toString();
        var category = category.toString();
        var email = email.toString();
        var phone = phone.toString();
        var cellphone = cellphone.toString();
        var address = address.toString();
        var id_artesano = idd;

        var id_usertemp = $('input:text[id=id_user]').val();
        var datatemp = $('input:text[id=data]').val();

        if (product_nametemp == "" || descriptiontemp == "" || pricetemp == "" ) {
            alert("Empty fields");
        }else{
            db.transaction(function (tx) { tx.executeSql(insertStatement, [product_nametemp, descriptiontemp, pricetemp, quantitytemp, category, user_name, email, phone, cellphone, address, id_usertemp, datatemp, id_artesano ], loadAndReset, onError); });
            alert("Record inserted");
        }
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
        
}
 
function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
 
{
 
    var iddelete = id.toString();
 
    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
 
    resetForm();
 
}
 
function updateRecord() // Get id of record . Function Call when Delete Button Click..
 
{
 
    var product_nameupdate = $('input:text[id=product_name]').val().toString();
    var descriptionupdate = $('input:text[id=description]').val().toString();
    var priceupdate = $('input:text[id=price]').val().toString();
    var quantityupdate = $('input:text[id=quantity]').val().toString();
 
    var productidupdate = $("#id").val();
 
    db.transaction(function (tx) { tx.executeSql(updateStatement, [product_nameupdate, descriptionupdate, priceupdate, quantityupdate, Number(productidupdate)], loadAndReset, onError); });
    onloadDone = false; 
}
 
function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
 
{
 
    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
 
    resetForm();
 
    initDatabase();
 
}
 
function loadRecord(i) // Function for display records which are retrived from database.
 
{

    var item = dataset.item(i);
 
    $("#product_name").val((item['product_name']).toString());
    $("#description").val((item['description']).toString());
    $("#price").val((item['price']).toString());
    $("#quantity").val((item['quantity']).toString());

    $("#category").val((item['category']).toString());
    $("#user_name").val((item['user_name']).toString());
    $("#email").val((item['email']).toString());
    $("#phone").val((item['phone']).toString());
    $("#cellphone").val((item['cellphone']).toString());
    $("#address").val((item['address']).toString());
    $("#id_user").val((item['id_user']).toString());
    $("#data").val((item['data']).toString());
    $("#dataImg").attr("src",(item['data']).toString());

    $("#id").val((item['id']).toString());
}
 
function resetForm() // Function for reset form input values.
 
{

    $("#product_name").val("");
    $("#description").val("");
    $("#price").val("");
    $("#quantity").val("");

    $("#id").val("");
 
}
 
function loadAndReset() //Function for Load and Reset...
 
{
 
    resetForm();
 
    showRecords();
 
}
 
function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}

function showRecords() // Function For Retrive data from Database Display records as list
 
{
 

    $("#results").html('<ul class="list">');
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
         if( onloadDone == false)
         {
            dataset = result.rows;
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
           

               var linkeditdelete = '<a class="item item-thumbnail-left" href="product_contact.html?'+
                'id_product=' + item['id'] +
                '&productname=' + item['product_name'] +
                '&description=' + item['description'] +
                '&price=' + item['price'] +
                '&category=' + item['category'] +
                '&id_artesano=' + item['id_artesano'] +
                '&user_name=' + item['user_name'] +
                '&email=' + item['email'] +
                '&phone=' + item['phone'] +
                '&cellphone=' + item['cellphone'] +
                '&address=' + item['address'] +
                 '"><img src="' + item['data'] + '"><h2>' + item['product_name']   + '   ' + '</h2><p>Product Id: ' +  item['id']  + '</br>Craftsman: ' + item['user_name'] + '<br>Category: ' + item['category'] + '</br></p></a>';

                $("#results").append(linkeditdelete);
 
            }
  $("#results").append('</ul>');
              onloadDone = true;
            }
        });
 
    });

    

 
}



 
$(document).ready(function () // Call function when page is ready for load..
 
{
;
 
    $("body").fadeIn(2000); // Fede In Effect when Page Load..
 
    initDatabase();
 
    $("#submitButton").click(insertRecord);  // Register Event Listener when button click.
 
    $("#btnUpdate").click(updateRecord);
 
    $("#btnReset").click(resetForm);
 
    $("#btnDrop").click(dropTable);
 
});
 