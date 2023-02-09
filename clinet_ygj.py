import tkinter as tk
import requests

def create_user():
    # Get username and password
    username = username_entry.get()
    password = password_entry.get()

    # sending post request to flask server and get respond
    response = requests.post('http://127.0.0.1:5000/create_user', data={'username': username, 'password': password})

    # Dealing with response
    if response.status_code == 200:
        result_label.config(text="User created successfully")
    else:
        result_label.config(text="Failed to create user")

# Create main window
root = tk.Tk()
root.title("Create User")

# Create username window and text entry
username_label = tk.Label(root, text="Username")
username_label.grid(row=0, column=0)

username_entry = tk.Entry(root)
username_entry.grid(row=0, column=1)

# Create password window and text entry
password_label = tk.Label(root, text="Password")
password_label.grid(row=1, column=0)

password_entry = tk.Entry(root, show="*")
password_entry.grid(row=1, column=1)

# Create submit button
submit_button = tk.Button(root, text="Submit", command=create_user)
submit_button.grid(row=2, column=0, columnspan=2)

# Create result window
result_label = tk.Label(root)
result_label.grid(row=3, column=0, columnspan=2)

# Run main
root.mainloop()