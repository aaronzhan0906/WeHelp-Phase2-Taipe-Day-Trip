import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="rootroot",
    database="taipei_attractions"
)

mycursor = mydb.cursor()

print("Database taipei_attractions conneted.")

def get_cursor():
    return mycursor

def commit_changes():
    mydb.commit()




