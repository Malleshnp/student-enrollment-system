# 🎓 Student Enrollment Management System

A responsive and interactive Student Enrollment Management System built using **HTML**, **Bootstrap**, **JavaScript**, and **JSONPowerDB (JPDB)**.

This project demonstrates complete CRUD operations with real-time database integration and dynamic UI behavior for managing student records efficiently.

---

# 🚀 Features

✅ Add New Student Records
✅ Fetch Existing Student Details Automatically
✅ Update Student Information
✅ Delete Student Records
✅ View All Saved Students
✅ Edit Students Directly from Student List
✅ Dynamic Button Activation Logic
✅ Vacate Date Support for Existing Students
✅ Real-Time JSONPowerDB Integration
✅ Responsive Bootstrap UI
✅ Form Validation
✅ Primary Key Handling using Roll Number

---

# 🛠️ Tech Stack

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (Vanilla JS)
* JSONPowerDB (JPDB)

---

# 📂 Database Details

### Database Name

```bash
SCHOOL-DB
```

### Relation/Table Name

```bash
STUDENT-TABLE
```

### Fields

```bash
Roll-No
Full-Name
Class
Birth-Date
Address
Enrollment-Date
Vacate-Date
```

### Primary Key

```bash
Roll-No
```

---

# ⚙️ Project Workflow

## 🆕 New Student

1. Enter Roll Number
2. If Roll Number does not exist:

   * Save button activates
   * User enters student details
3. Save student record to database

---

## ✏️ Existing Student

1. Enter existing Roll Number
2. Student data loads automatically
3. Update/Delete buttons activate
4. User can:

   * Update details
   * Add vacate date
   * Delete record

---

## 📋 View Students

* Displays all saved students
* Latest students shown first
* Click **Edit** to load student data into form

---

# 📸 Functionalities Covered

| Feature               | Status |
| --------------------- | ------ |
| Create                | ✅      |
| Read                  | ✅      |
| Update                | ✅      |
| Delete                | ✅      |
| Dynamic Form Handling | ✅      |
| Database Connectivity | ✅      |
| Validation            | ✅      |

---

# 💡 Key Learning Outcomes

* CRUD Operations
* API Integration
* JSON Handling
* Frontend Form Validation
* Database Communication
* Dynamic DOM Manipulation
* Bootstrap Responsive Design
* Real-Time Data Fetching

---

# 🖥️ How to Run

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Malleshnp/student-enrollment-system.git
```

---

## 2️⃣ Open Project Folder

```bash
cd student-enrollment-system
```

---

## 3️⃣ Configure JPDB Token

Open:

```bash
script.js
```

Replace:

```javascript
const connToken = "YOUR_TOKEN";
```

with your actual JPDB connection token.

---

## 4️⃣ Run Project

Open:

```bash
index.html
```

in browser.

---

# 🌐 GitHub Repository

Repository Link:

```bash
https://github.com/Malleshnp/student-enrollment-system
```

---

# 📈 Future Improvements

* Student Search Feature
* Pagination
* Authentication/Login
* Export Student Data
* Attendance Management
* Student Dashboard
* Dark Mode UI

---

# 👨‍💻 Developer

### Mallesh N P

Passionate about:

* Full Stack Development
* JavaScript Applications
* Database Systems
* Problem Solving
* Web Technologies

---

# 📄 License

This project is developed for educational and learning purposes.
