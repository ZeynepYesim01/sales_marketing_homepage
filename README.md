# Your Company - Sales & Marketing Solutions Homepage

This repository features a modern, responsive homepage for "Your Company," showcasing its sales and marketing solutions. Built with **HTML, CSS, and JavaScript**, this project offers easy deployment with **Docker**.

---

## 🚀 Features

- **Responsive Design:** Adapts seamlessly to various screen sizes.
- **Loading Screen:** Provides a smooth user experience during page load.
- **Dynamic Welcome Message:** Greets users with a personalized message.
- **Interactive Panda Assistant:** An AI-powered chatbot for user engagement.
- **Docker Support:** Enables easy setup and deployment.

---

## 🛠️ Setup and Running

Follow these steps to get the project running on your local machine using Docker.

### Prerequisites

You'll need the following software installed:

- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**: For Windows or macOS. Linux users only need Docker Engine.
- **[Git](https://git-scm.com/downloads)** (Optional, but recommended): For cloning the repository.

---

### Steps

1.  **Download or Clone the Project:**

    If you have Git, clone the repository:

    ```bash
    git clone https://github.com/YOUR_USERNAME/sales_marketing_homepage.git
    cd sales_marketing_homepage
    ```

    Alternatively, download the project as a ZIP file from GitHub, extract it, and navigate to the directory in your terminal.

2.  **Insert Your Gemini API Key:**

    Open `script.js` in the project's root directory. Find the line `const apiKey = "";` and replace the empty quotes with your **Google Gemini API key**:

    ```javascript
    // script.js
    const apiKey = "YOUR_GEMINI_API_KEY_HERE"; // PASTE YOUR GEMINI API KEY HERE! Example: "AIzaSyC..."
    ```

    **Important:** Ensure your API key is enclosed within the quotes. The Panda Assistant won't work without a valid key.

    _Note:_ This static website uses client-side JavaScript, meaning the API key is embedded directly. For production, consider using a backend proxy to secure API keys.

3.  **Run the Project with Docker (Automated Script):**

    A batch script, `run_docker.bat`, is provided for a streamlined setup.

    Double-click `run_docker.bat` in your project folder, or run it from your terminal:

    ```bash
    .\run_docker.bat
    ```

    This script will:

    - Stop and remove any existing container named `my-competition-web-container`.
    - Rebuild the Docker image (`my-competition-web`) from scratch, incorporating your latest changes.
    - Start a new container, mapping your host's **port 8080** to the container's **port 80** (where Nginx serves the website).

    You'll see command-line output detailing the progress of these Docker operations.

---

## 🌐 Usage

Once `run_docker.bat` finishes, open your web browser and go to:

```
http://localhost:8080
```

You should see your homepage. Click the **Panda mascot** in the bottom right to open the chat assistant and start interacting\!

**Browser Cache Note:** To ensure you always see the latest changes after running the Docker script, perform a **hard refresh** in your browser:

- **Windows/Linux:** `Ctrl + Shift + R`
- **macOS:** `Cmd + Shift + R`

---

## Troubleshooting

Here are solutions for common issues:

### 1\. `Error response from daemon: Bind for 0.0.0.0:8080 failed: port is already allocated`

This means port 8080 is already in use.

**Solution:**
Even though `run_docker.bat` tries to free the port, another process might be using it.

1.  Open **Command Prompt (CMD) as an Administrator**.
2.  Find the process using port 8080:
    ```bash
    netstat -ano | findstr :8080
    ```
3.  Note the **PID** (Process ID) from the output (e.g., `1234`).
4.  Terminate that process:
    ```bash
    taskkill /PID 1234 /F
    ```
5.  Run `run_docker.bat` again.

### 2\. `ERROR: error during connect: ... The system cannot find the file specified.`

This indicates the Docker daemon (service) isn't running or is inaccessible.

**Solution:**

1.  Ensure the **Docker Desktop icon (whale)** in your Windows system tray is green and running.
2.  If not, launch "Docker Desktop" from your Start menu and wait for it to fully initialize.
3.  If it's running but the error persists, right-click the Docker Desktop icon and select "Restart."
4.  As a last resort, restart your computer.

### 3\. Panda Assistant says "An error occurred while fetching the response." or "Sorry, I couldn't get a response."

This points to an issue with the Google Gemini API call.

**Solution:**

1.  **Verify API Key:** Double-check that you've correctly pasted your valid Google Gemini API key into `script.js` and that it's within the quotes, with no extra spaces.
2.  **Check Browser Console (F12):**
    - Open your browser's **developer tools (F12)**.
    - Go to the **Console Tab** and look for red error messages (especially those starting with `Error calling Gemini API:`).
    - Go to the **Network Tab**. After sending a message to the Panda Assistant, find the `generateContent` request. Check its **"Status" code** (e.g., `401 Unauthorized`, `403 Forbidden`, `429 Too Many Requests`) and the detailed error message in the **"Response" tab**. These usually indicate an invalid API key, exceeded quota, or an authorization issue.
3.  **Internet Connection:** Ensure your computer has an active internet connection.

---

## ✉️ Contact

- **Your Name:** \[Your Name]
- **Email:** \[Your Email Address]
- **LinkedIn:** \[Link to your LinkedIn Profile]
- **GitHub:** \[Link to your GitHub Profile]
