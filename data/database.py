from mysql.connector.pooling import MySQLConnectionPool


db_pool = MySQLConnectionPool(
    pool_name = "mysql_pool",
    pool_size = 20, 
    pool_reset_session = True,
    host = "localhost",
    user = "root",
    password = "rootroot",
    database = "taipei_attractions"
)



def get_cursor():
    conn = db_pool.get_connection()
    cursor = conn.cursor()
    return cursor, conn

print("Connection pool created.")


def conn_commit(conn):
    conn.commit()
    return conn

def conn_close(conn):
    conn.close()