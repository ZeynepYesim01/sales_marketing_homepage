const apiKey = "AIzaSyC51tp-lQ6WeXYn8n1sArJGsWR76DKX55A"; // Güvenlik Notu: API anahtarınızı client-side'da tutmak risklidir.

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired.");

  // Loading Screen Management
  const loadingScreen = document.getElementById("loadingScreen");
  const mainContent = document.getElementById("mainContent");

  if (!loadingScreen || !mainContent) {
    console.error(
      "Loading screen or main content elements not found! Please check your HTML IDs."
    );
    if (mainContent) {
      mainContent.style.display = "block";
      mainContent.classList.add("visible");
      document.body.style.overflow = "auto";
    }
    return; // Terminate the process here
  }

  document.body.style.overflow = "hidden";
  console.log("Body overflow set to hidden.");

  setTimeout(() => {
    console.log("Timeout 1 (3s) triggered. Fading out loading screen.");
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      console.log(
        "Timeout 2 (0.5s) triggered. Hiding loading screen and showing main content."
      );
      loadingScreen.style.display = "none";
      mainContent.style.display = "block";
      setTimeout(() => {
        console.log(
          "Timeout 3 (50ms) triggered. Adding 'visible' class to main content."
        );
        mainContent.classList.add("visible");
      }, 50);
      document.body.style.overflow = "auto";
      console.log("Body overflow set to auto.");
    }, 500);
  }, 3000);

  // --- Mobile Menu Toggle (Sidebar'ı kontrol edecek şekilde güncellendi) ---
  const mobileMenuToggle = document.getElementById("mobile-menu");
  const sidebar = document.querySelector(".sidebar"); // Yeni sidebar elementini seçiyoruz

  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener("click", () => {
      console.log("Mobile menu toggled.");
      sidebar.classList.toggle("active"); // Sidebar'ın 'active' sınıfını değiştir
      mobileMenuToggle.classList.toggle("open"); // Hamburger ikonunun durumunu değiştir (CSS'te 'open' sınıfı için stil eklenmeli)
    });

    // Sidebar'daki menü öğelerine tıklandığında sidebar'ı kapat (mobil görünümde)
    const sidebarLinks = document.querySelectorAll(".sidebar-nav a");
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Sadece mobil görünümde kapatmak için bir kontrol ekleyebiliriz
        if (window.innerWidth <= 768) {
          console.log("Sidebar link clicked, closing sidebar.");
          sidebar.classList.remove("active");
          mobileMenuToggle.classList.remove("open");
        }
      });
    });
  } else {
    console.error(
      "Mobile menu toggle or sidebar elements not found for mobile menu functionality."
    );
  }

  // Optional: Smooth scroll for in-page links (hala geçerli, sidebar linkleri için de çalışacak)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Welcome Message (artık dashboard'daki welcome-card içindeki h3'ü hedefleyecek)
  // HTML'deki welcome-message ID'si welcome-card'a taşındı.
  // Bu yüzden, ya welcome-card içindeki bir elementi hedeflemeliyiz
  // ya da welcome-card'a özel bir ID vermeliyiz.
  // Önerilen: `welcome-card` içindeki `h3`'ü hedefleyelim.
  const welcomeCardTitle = document.querySelector(".welcome-card h3"); // HTML'deki .welcome-card içindeki h3
  const userName = localStorage.getItem("kullaniciAdi");

  if (welcomeCardTitle) {
    let welcomeText = "";
    if (userName) {
      welcomeText = `<i class="fas fa-star"></i> Welcome ${userName}!`; // İkonu da ekleyebiliriz
    } else {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        welcomeText = `<i class="fas fa-sun"></i> Good Morning!`;
      } else if (currentHour < 18) {
        welcomeText = `<i class="fas fa-cloud-sun"></i> Good Afternoon!`;
      } else {
        welcomeText = `<i class="fas fa-moon"></i> Good Evening!`;
      }
    }
    welcomeCardTitle.innerHTML = welcomeText; // innerHTML kullanın çünkü ikon da var
  } else {
    console.warn(
      "Welcome card title element not found. Welcome message will not be displayed."
    );
  }

  // --- Panda Assistant Chat and Automatic Message Features (Mevcut haliyle kalsın) ---

  const pandaMascotToggle = document.getElementById("panda-mascot-toggle");
  const pandaChatContainer = document.getElementById("panda-chat-container");
  const closeChatButton = document.getElementById("close-chat-button");
  const pandaMessagesDisplay = document.getElementById(
    "panda-messages-display"
  );
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  const loadingIndicator = document.getElementById("loading-indicator");

  if (
    !pandaMascotToggle ||
    !pandaChatContainer ||
    !closeChatButton ||
    !pandaMessagesDisplay ||
    !userInput ||
    !sendButton ||
    !loadingIndicator
  ) {
    console.error(
      "Panda chat elements not found! Chat functionality will not work. Please check your HTML IDs for panda chat."
    );
    // Return here to prevent further errors if chat elements are missing
    return;
  }

  let chatHistory = [];

  if (!apiKey) {
    console.warn("API Key is missing! Gemini API calls may fail.");
    addMessageToDisplay(
      "assistant",
      "API key is missing. Chat functionality may not work."
    );
  }

  function addMessageToDisplay(sender, message) {
    const messageBubble = document.createElement("div");
    messageBubble.classList.add("panda-message-bubble");
    messageBubble.classList.add(
      sender === "user" ? "user-message" : "assistant-message"
    );
    messageBubble.textContent = message;
    pandaMessagesDisplay.appendChild(messageBubble);
    pandaMessagesDisplay.scrollTop = pandaMessagesDisplay.scrollHeight;
  }

  const initialAssistantMessage = "Hello! How can I assist you today? 🐾";
  if (chatHistory.length === 0) {
    addMessageToDisplay("assistant", initialAssistantMessage);
    chatHistory.push({
      role: "model",
      parts: [
        {
          text: initialAssistantMessage,
        },
      ],
    });
  }

  const autoMessages = [
    "Refill your coffee, keep going! ☕",
    "Is it break time? Maybe a little walk!🚶‍♀️",
    "Good things will happen today ✨",
    "Take a deep breath... and keep going!🧘‍♀️",
    "Give yourself coffee break ☕",
    "How can I help you today?",
    "Don't forget to take a short break!",
    "What's on your mind?",
  ];

  let autoMessageInterval;

  function startAutoMessages() {
    clearInterval(autoMessageInterval);
    console.log("Automatic messages started.");

    autoMessageInterval = setInterval(() => {
      const random = Math.floor(Math.random() * autoMessages.length);
      const message = autoMessages[random];

      chatHistory.push({
        role: "model",
        parts: [
          {
            text: message,
          },
        ],
      });
      if (pandaChatContainer.style.display !== "none") {
        addMessageToDisplay("assistant", message);
      }
      console.log(
        "Automatic message added (to history and display if visible):",
        message
      );
    }, 30000);
  }

  function stopAutoMessages() {
    clearInterval(autoMessageInterval);
    console.log("Automatic messages stopped.");
  }

  async function sendMessage() {
    const prompt = userInput.value.trim();
    if (!prompt) {
      console.log("User input is empty.");
      return;
    }

    addMessageToDisplay("user", prompt);
    chatHistory.push({
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    });
    userInput.value = "";
    loadingIndicator.style.display = "flex";
    console.log("Sending message, loading indicator is on.");

    stopAutoMessages();

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: chatHistory,
      };
      console.log("API request payload:", payload);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error:", response.status, errorData);
        throw new Error(
          `API Error: ${response.status} - ${
            errorData.error.message || "Unknown Error"
          }`
        );
      }

      const result = await response.json();
      console.log("API response received:", result);

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        addMessageToDisplay("assistant", text);
        chatHistory.push({
          role: "model",
          parts: [
            {
              text: text,
            },
          ],
        });
        console.log("Assistant response:", text);
      } else {
        addMessageToDisplay(
          "assistant",
          "Sorry, I couldn't get a response. Please try again."
        );
        console.error("Unexpected API response structure:", result);
      }
    } catch (error) {
      addMessageToDisplay(
        "assistant",
        "An error occurred while fetching the response. Please try again."
      );
      console.error("Error calling Gemini API:", error);
    } finally {
      loadingIndicator.style.display = "none";
      console.log("Loading indicator is off.");
      if (pandaChatContainer.style.display !== "none") {
        startAutoMessages();
      }
    }
  }

  pandaMascotToggle.addEventListener("click", () => {
    const isChatVisible = pandaChatContainer.style.display !== "none";
    pandaChatContainer.style.display = isChatVisible ? "none" : "flex";
    console.log("Panda chat container visibility changed to:", !isChatVisible);

    if (isChatVisible) {
      stopAutoMessages();
    } else {
      pandaMessagesDisplay.innerHTML = "";
      chatHistory.forEach((msg) => {
        addMessageToDisplay(
          msg.role === "user" ? "user" : "assistant",
          msg.parts[0].text
        );
      });
      startAutoMessages();
      pandaMessagesDisplay.scrollTop = pandaMessagesDisplay.scrollHeight;
    }
  });

  closeChatButton.addEventListener("click", () => {
    pandaChatContainer.style.display = "none";
    stopAutoMessages();
    console.log("Chat container closed.");
  });

  sendButton.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  startAutoMessages();
});
document.addEventListener("DOMContentLoaded", () => {
  const currentMonthYearSpan = document.getElementById("currentMonthYear");
  const datesGrid = document.getElementById("datesGrid");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  let currentDate = new Date(); // Şu anki tarihi başlangıç noktası olarak al

  function renderCalendar() {
    datesGrid.innerHTML = ""; // Önceki günleri temizle

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11 arası (Ocak: 0, Aralık: 11)

    // Ay adları dizisi
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Ay ve yılı güncelle
    currentMonthYearSpan.textContent = `${monthNames[month]} ${year}`;

    // Ayın ilk gününün hangi haftanın hangi gününe denk geldiğini bul (0: Pazar, 1: Pazartesi...)
    // Date objesi varsayılan olarak Pazar'ı 0 alır, bu yüzden Pazartesi'yi 0 yapmak için ayarlama gerekebilir.
    // Veya HTML'deki günleri Pazar'dan başlatırsın. Ben bu örnekte Monday'i ilk gün kabul edeceğim.
    const firstDayOfMonth = new Date(year, month, 1);
    // getDay() 0 (Pazar) - 6 (Cumartesi) döner. Pazartesi için 0-6 aralığında bir değer elde etmek için:
    // Eğer Pazar 0 ise, Pazartesi 1, Salı 2 ... Cumartesi 6 olur.
    // Bizim HTML'imizde Mon ilk, o yüzden getDay() - 1 ile ayarlama yapalım.
    // Eğer getDay() Pazar (0) ise, firstDayIndex = 6 (Cumartesi)
    // Eğer getDay() Pazartesi (1) ise, firstDayIndex = 0 (Pazartesi)
    let firstDayIndex = firstDayOfMonth.getDay();
    if (firstDayIndex === 0) {
      // Pazar ise
      firstDayIndex = 6; // Haftanın son günü olarak kabul et
    } else {
      firstDayIndex--; // Pazartesi 0, Salı 1... olarak ayarla
    }

    // Ayın toplam gün sayısını bul
    const lastDayOfMonth = new Date(year, month + 1, 0); // Bir sonraki ayın 0. günü = bu ayın son günü
    const daysInMonth = lastDayOfMonth.getDate();

    // Takvimdeki boş günleri doldur (ayın ilk gününden önceki boşluklar)
    for (let i = 0; i < firstDayIndex; i++) {
      const emptySpan = document.createElement("span");
      datesGrid.appendChild(emptySpan);
    }

    // Ayın günlerini doldur
    for (let day = 1; day <= daysInMonth; day++) {
      const daySpan = document.createElement("span");
      daySpan.textContent = day;

      // Bugünü işaretle
      const today = new Date();
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        daySpan.classList.add("today");
      }

      datesGrid.appendChild(daySpan);
    }
  }

  // Önceki Ay butonu
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  // Sonraki Ay butonu
  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Sayfa yüklendiğinde takvimi oluştur
  renderCalendar();
});
document.addEventListener("DOMContentLoaded", () => {
  const newTopicBtn = document.getElementById("newTopicBtn");
  const newTopicModal = document.getElementById("newTopicModal");
  const closeButton = newTopicModal.querySelector(".close-button");
  const newTopicForm = document.getElementById("newTopicForm");

  // Yeni Konu butonuna tıklanınca modalı aç
  if (newTopicBtn) {
    newTopicBtn.addEventListener("click", () => {
      newTopicModal.style.display = "flex"; // Flex yaparak ortala
    });
  }

  // Kapatma butonuna tıklanınca modalı kapat
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      newTopicModal.style.display = "none";
    });
  }

  // Modal dışına tıklanınca modalı kapat
  window.addEventListener("click", (event) => {
    if (event.target == newTopicModal) {
      newTopicModal.style.display = "none";
    }
  });

  // Form gönderildiğinde (şimdilik sadece uyarı veriyoruz)
  if (newTopicForm) {
    newTopicForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Formun varsayılan gönderimini engelle
      const topicTitle = document.getElementById("topicTitle").value;
      const topicContent = document.getElementById("topicContent").value;

      alert(
        `New Topic Created!\nTitle: ${topicTitle}\nContent: ${topicContent}`
      );
      // Burada gerçek bir AJAX isteği ile veritabanına gönderme yapılır.
      newTopicModal.style.display = "none"; // Modalı kapat
      newTopicForm.reset(); // Formu sıfırla
    });
  }
});
