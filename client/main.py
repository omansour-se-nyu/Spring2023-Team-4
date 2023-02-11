import tkinter as tk
from tkinter import ttk
from frames.register_frame import RegisterFrame
from frames.login_frame import LoginFrame


class Main(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title('NYUsed')

        self.notebook = ttk.Notebook(self)

        self.register_frame = RegisterFrame(self.notebook)
        self.login_frame = LoginFrame(self.notebook)

        self.notebook.add(self.register_frame, text='Register')
        self.notebook.add(self.login_frame, text='Login')
        self.notebook.pack(expand=True, fill='both')


if __name__ == '__main__':
    app = Main()
    app.mainloop()
