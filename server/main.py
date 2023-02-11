from flask import Flask, request
import pymysql

app = Flask(__name__)


@app.route('/user/register', methods=['POST'])
def register():
    username = request.get_json()['username']
    password = request.get_json()['password']
    try:
        with conn.cursor() as cursor:
            cursor.execute('INSERT INTO user (username, password) VALUES (%s, %s)', (username, password))
            conn.commit()
            return 'OK', 200
    except Exception as e:
        print(e)
        return 'Failed to register', 400


@app.route('/user/login', methods=['POST'])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']
    try:
        with conn.cursor() as cursor:
            cursor.execute('SELECT * FROM user WHERE username=%s AND password=%s', (username, password))
            record = cursor.fetchone()
            if record:
                return 'OK', 200
            return 'Incorrect username or password', 401
    except Exception as e:
        print(e)
        return 'Failed to login', 400


if __name__ == '__main__':
    conn = pymysql.connect(host='3.231.26.120',
                           port=3306,
                           user='root',
                           password='HX332fM5ie7ZrH6hnNVMftT7Lb6',
                           database='nyused')
    app.run()
