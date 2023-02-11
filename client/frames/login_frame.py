import tkinter as tk
import requests
import json


class LoginFrame(tk.Frame):
    def __init__(self, notebook):
        super().__init__(notebook)

        self.username_label = tk.Label(self, text='Username:')
        self.username_label.grid(row=0, column=0)
        self.username_entry = tk.Entry(self)
        self.username_entry.grid(row=0, column=1)

        self.password_label = tk.Label(self, text='Password:')
        self.password_label.grid(row=1, column=0)
        self.password_entry = tk.Entry(self, show='*')
        self.password_entry.grid(row=1, column=1)

        self.submit_button = tk.Button(self, text="Login", command=self.validate_user)
        self.submit_button.grid(row=2, column=0, columnspan=2)

        self.result_label = tk.Label(self)
        self.result_label.grid(row=3, column=0, columnspan=2)

    def validate_user(self):
        username = self.username_entry.get()
        password = self.password_entry.get()
        response = requests.post('http://127.0.0.1:5000/user/login',
                                 data=json.dumps({'username': username, 'password': password}),
                                 headers={'Content-Type': 'application/json'})
        if response.status_code == 200:
            self.result_label.config(text="Login successfully")
        else:
            self.result_label.config(text="Failed to login")
