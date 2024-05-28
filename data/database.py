from mysql.connector.pooling import MySQLConnectionPool


db_pool = MySQLConnectionPool(
    pool_name = "mysql_pool",
    pool_size = 5, 
    pool_reset_session = True,
    host = "localhost",
    user = "root",
    password = "rootroot",
    database = "taipei_attractions"
)


print("Connection pool created.")

def get_cursor():
    conn = db_pool.get_connection()
    cursor = conn.cursor()
    return cursor, conn

def commit_changes(conn):
    conn.commit()
    conn.close()




