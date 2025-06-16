# Frontend Assignment – TaskNavigator

**Live Demo**: https://task-navigator-alpha.vercel.app

---
![image](https://github.com/user-attachments/assets/04a7c0a4-9803-4066-957f-f0bfa184130a)

## 🔧 Getting Started Locally

To run the project on your local machine:

1. **Clone** the repository (make sure you’re on the `main` branch).
2. Navigate into the project directory:
   `cd tasknavigator`
3. Install dependencies:
   `npm install`
4. Start the development server:
   `npm start`
5. Open your browser at:
   `http://localhost:3000`

---

## 🔐 Demo Login Credentials

### Developer Access:

* **Email:** [developer@fealtyx.com](mailto:developer@fealtyx.com)
* **Password:** Dev\@123

### Manager Access:

* **Email:** [manager@fealtyx.com](mailto:manager@fealtyx.com)
* **Password:** qwerty123

---

## ✨ Core Features

### 🔑 Authentication

* Role-based login for Developers and Managers.
* Redirects users to their respective dashboards post-login.

### 📊 Unified Dashboard (for both roles)

* Displays tasks in a responsive grid layout.
* **Task Summary Stats** section at the top gives a quick overview of:

  * Total Tasks
  * Open
  * In Progress
  * Pending Approval
  * Closed
* Filter tasks by **status**: Open, Closed, Pending Approval.
* Sort tasks by **priority**, **start date**, or **closed date**.
* A line chart visualizes task trends (active tasks per day).
* Each task card includes:

  * Title
  * Priority
  * Assigned To / By
  * Current Status (color-coded):

    * Open (🟢), In Progress (🔵), Closed (⚪), Pending Approval (🟡)

---

Clicking on a task reveals full details:
**Description, Comments, Dates (Start/Closed/Approved), Time Spent**, and more.

---

### 👨‍💻 Developer Dashboard

* Create new tasks with full detail.
* Edit or delete existing tasks.
* Update task details and log time.
* Change status to “Closed” to initiate the approval flow.
* Once marked as “Closed”, the task becomes “Pending Approval”.

### 👩‍💼 Manager Dashboard

* View tasks awaiting approval.
* Approve or Reject tasks after reviewing full details.
* Approval sets status to “Closed”; rejection reverts it to “Open”.

---

## 🚀 Future Enhancements

* Integrate a backend database (currently uses Redux and Local Storage).
* Push notifications for task approval/rejection status updates.
* Advanced filtering (e.g., by assignee or assigner).
* Add more productivity-oriented task-tracking features.

---

## 🛠 Tech Stack

* **React.js** – Frontend library
* **Redux** – State management
* **Tailwind CSS (Inline)** – Utility-first styling
* **Vercel** – Hosting platform

---
