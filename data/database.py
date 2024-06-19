from mysql.connector.pooling import MySQLConnectionPool


db_pool = MySQLConnectionPool(
    pool_name = "mysql_pool",
    pool_size = 30, 
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

def conn_commit(conn):
    conn.commit()

def conn_close(conn):
    try:
        if conn.is_connected():
            conn.close()
    except Exception as event:
        print("Error closing connection:", event)