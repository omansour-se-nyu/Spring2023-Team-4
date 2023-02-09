import tkinter as tk
import requests

def create_user():
    # 获取用户名和密码
    username = username_entry.get()
    password = password_entry.get()

    # 发送POST请求到Flask服务器，创建用户
    response = requests.post('http://127.0.0.1:5000/create_user', data={'username': username, 'password': password})

    # 处理响应
    if response.status_code == 200:
        result_label.config(text="User created successfully")
    else:
        result_label.config(text="Failed to create user")

# 创建主窗口
root = tk.Tk()
root.title("Create User")

# 创建用户名标签和文本框
username_label = tk.Label(root, text="Username")
username_label.grid(row=0, column=0)

username_entry = tk.Entry(root)
username_entry.grid(row=0, column=1)

# 创建密码标签和文本框
password_label = tk.Label(root, text="Password")
password_label.grid(row=1, column=0)

password_entry = tk.Entry(root, show="*")
password_entry.grid(row=1, column=1)

# 创建提交按钮
submit_button = tk.Button(root, text="Submit", command=create_user)
submit_button.grid(row=2, column=0, columnspan=2)

# 创建结果标签
result_label = tk.Label(root)
result_label.grid(row=3, column=0, columnspan=2)

# 运行主窗口
root.mainloop()