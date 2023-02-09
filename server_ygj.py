from flask import Flask, request
import pymysql
app = Flask(__name__)
conn = pymysql.connect(host='3.231.26.120',
    port = 3306,
    user='root',
    password='HX332fM5ie7ZrH6hnNVMftT7Lb6',
    database='nyused')
@app.route('/create_user', methods=['POST'])
def create_user():
    # 获取用户名和密码
    username = request.form['username']
    password = request.form['password']
    print(username)
    print(password)
    # 将用户信息插入数据库
    cursor = conn.cursor()
    cursor.execute("INSERT INTO user (username, password) VALUES (%s, %s)", (username, password))
    conn.commit()

    return "User created successfully", 200

if __name__ == '__main__':
    app.run(debug=True)
