class WayneIndustriesApp {
    constructor() {
      this.currentPage = "dashboard"
      this.isLoading = true
    }
  
    init() {
      console.log("Inicializando aplicação...")
      this.showLoadingScreen()
  
      setTimeout(() => {
        this.hideLoadingScreen()
        this.checkAuthentication()
        this.setupEventListeners()
      }, 2000)
    }
  
    showLoadingScreen() {
      const loadingScreen = document.getElementById("loading-screen")
      if (loadingScreen) {
        loadingScreen.style.display = "flex"
        console.log("Tela de loading exibida")
      }
    }
  
    hideLoadingScreen() {
      const loadingScreen = document.getElementById("loading-screen")
      if (loadingScreen) {
        loadingScreen.style.display = "none"
        console.log("Tela de loading ocultada")
      }
    }
  
    checkAuthentication() {
      console.log("Verificando autenticação...")
      console.log("AuthManager disponível:", !!window.authManager)
  
      if (window.authManager && window.authManager.isAuthenticated()) {
        console.log("Usuário já autenticado, mostrando app principal")
        this.showMainApp()
      } else {
        console.log("Usuário não autenticado, mostrando tela de login")
        this.showLoginPage()
      }
    }
  
    showLoginPage() {
      console.log("Exibindo página de login")
      const loginPage = document.getElementById("login-page")
      const mainApp = document.getElementById("main-app")
  
      if (loginPage) {
        loginPage.classList.remove("hidden")
        loginPage.style.display = "flex"
      }
      if (mainApp) {
        mainApp.classList.add("hidden")
      }
    }
  
    showMainApp() {
      console.log("Exibindo aplicação principal")
      const loginPage = document.getElementById("login-page")
      const mainApp = document.getElementById("main-app")
  
      if (loginPage) {
        loginPage.classList.add("hidden")
        loginPage.style.display = "none"
      }
      if (mainApp) {
        mainApp.classList.remove("hidden")
      }
  
      this.updateUserInfo()
      this.initializeModules()
      this.showPage("dashboard")
    }
  
    updateUserInfo() {
      const userInfoEl = document.getElementById("user-info")
      if (window.authManager && userInfoEl) {
        const user = window.authManager.getCurrentUser()
        if (user) {
          userInfoEl.textContent = `${user.name} (${this.getUserTypeLabel(user.type)})`
          console.log("Informações do usuário atualizadas:", user.name)
        }
      }
    }
  
    getUserTypeLabel(type) {
      const labels = {
        admin: "Administrador",
        manager: "Gerente",
        employee: "Funcionário",
      }
      return labels[type] || type
    }
  
    initializeModules() {
      console.log("Inicializando módulos...")
      if (window.dashboard) {
        window.dashboard.init()
        console.log("Dashboard inicializado")
      }
      if (window.securityManager) {
        window.securityManager.init()
        console.log("SecurityManager inicializado")
      }
      if (window.resourceManager) {
        window.resourceManager.init()
        console.log("ResourceManager inicializado")
      }
      this.initializeReports()
    }
  
    initializeReports() {
      this.updateRecentActivities()
      this.updateSecurityAlerts()
    }
  
    updateRecentActivities() {
      const activities = [
        { icon: "sign-in-alt", text: "Bruce Wayne fez login no sistema", time: "2 min atrás", type: "info" },
        { icon: "shield-alt", text: "Sistema de segurança ativado no setor A", time: "5 min atrás", type: "success" },
        { icon: "wrench", text: "Manutenção programada para Batmóvel", time: "10 min atrás", type: "warning" },
        { icon: "user-plus", text: "Novo funcionário adicionado ao sistema", time: "15 min atrás", type: "info" },
        { icon: "exclamation-triangle", text: "Alerta de segurança no perímetro", time: "20 min atrás", type: "danger" },
      ]
  
      const container = document.getElementById("recent-activities")
      if (!container) return
  
      container.innerHTML = ""
  
      activities.forEach((activity) => {
        const item = document.createElement("div")
        item.className = "flex items-center p-3 bg-gray-700 rounded-lg"
        item.innerHTML = `
                  <div class="flex items-center">
                      <div class="p-2 rounded-full bg-${this.getActivityColor(activity.type)}-500 bg-opacity-20 mr-3">
                          <i class="fas fa-${activity.icon} text-${this.getActivityColor(activity.type)}-400"></i>
                      </div>
                      <div class="flex-1">
                          <p class="text-white text-sm">${activity.text}</p>
                          <p class="text-gray-400 text-xs">${activity.time}</p>
                      </div>
                  </div>
              `
        container.appendChild(item)
      })
    }
  
    updateSecurityAlerts() {
      const alerts = [
        {
          icon: "exclamation-triangle",
          text: "Tentativa de acesso não autorizado detectada",
          level: "high",
          time: "1 min atrás",
        },
        { icon: "wifi", text: "Conexão instável no sistema de vigilância", level: "medium", time: "8 min atrás" },
        { icon: "battery-quarter", text: "Bateria baixa em sensores do setor C", level: "low", time: "12 min atrás" },
      ]
  
      const container = document.getElementById("security-alerts")
      if (!container) return
  
      container.innerHTML = ""
  
      alerts.forEach((alert) => {
        const item = document.createElement("div")
        item.className = "flex items-center p-3 bg-red-900 bg-opacity-30 border border-red-500 rounded-lg"
        item.innerHTML = `
                  <div class="flex items-center">
                      <div class="p-2 rounded-full bg-red-500 bg-opacity-20 mr-3">
                          <i class="fas fa-${alert.icon} text-red-400"></i>
                      </div>
                      <div class="flex-1">
                          <p class="text-white text-sm">${alert.text}</p>
                          <div class="flex items-center mt-1">
                              <span class="text-xs px-2 py-1 rounded-full bg-${this.getAlertColor(alert.level)}-500 bg-opacity-20 text-${this.getAlertColor(alert.level)}-400 mr-2">
                                  ${this.getAlertLevelLabel(alert.level)}
                              </span>
                              <span class="text-gray-400 text-xs">${alert.time}</span>
                          </div>
                      </div>
                  </div>
              `
        container.appendChild(item)
      })
    }
  
    getActivityColor(type) {
      const colors = {
        info: "blue",
        success: "green",
        warning: "yellow",
        danger: "red",
      }
      return colors[type] || "gray"
    }
  
    getAlertColor(level) {
      const colors = {
        high: "red",
        medium: "yellow",
        low: "blue",
      }
      return colors[level] || "gray"
    }
  
    getAlertLevelLabel(level) {
      const labels = {
        high: "Alto",
        medium: "Médio",
        low: "Baixo",
      }
      return labels[level] || level
    }
  
    setupEventListeners() {
      console.log("Configurando event listeners...")
      const loginForm = document.getElementById("login-form")
      const logoutBtn = document.getElementById("logout-btn")
  
      if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
          e.preventDefault()
          console.log("Formulário de login submetido")
          this.handleLogin()
        })
        console.log("Event listener do login configurado")
      } else {
        console.error("Formulário de login não encontrado!")
      }
  
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          this.handleLogout()
        })
      }
  
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault()
          const page = link.getAttribute("data-page")
          this.showPage(page)
        })
      })
  
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("fixed") && e.target.classList.contains("inset-0")) {
          this.closeModals()
        }
      })
  
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeModals()
        }
      })
    }
  
    handleLogin() {
      console.log("Processando login...")
      const usernameEl = document.getElementById("username")
      const passwordEl = document.getElementById("password")
  
      if (!usernameEl || !passwordEl) {
        console.error("Elementos de username ou password não encontrados!")
        alert("Erro: Elementos do formulário não encontrados.")
        return
      }
  
      const username = usernameEl.value.trim()
      const password = passwordEl.value.trim()
  
      console.log("Dados do login:", { username, password })
  
      if (!username || !password) {
        alert("Por favor, preencha usuário e senha.")
        return
      }
  
      if (!window.authManager) {
        console.error("AuthManager não está disponível!")
        alert("Erro: Sistema de autenticação não disponível.")
        return
      }
  
      if (window.authManager.login(username, password)) {
        console.log("Login bem-sucedido!")
        this.showMainApp()
      } else {
        console.log("Login falhou!")
        alert(
          "Credenciais inválidas. Tente novamente.\n\nUsuários disponíveis:\n- admin / senha123\n- manager / senha123\n- employee / senha123",
        )
      }
    }
  
    handleLogout() {
      if (confirm("Tem certeza que deseja sair do sistema?")) {
        if (window.authManager) window.authManager.logout()
        this.showLoginPage()
      }
    }
  
    showPage(pageName) {
      document.querySelectorAll(".page-content").forEach((page) => {
        page.classList.add("hidden")
      })
  
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active", "bg-gray-700", "text-yellow-400")
        link.classList.add("text-gray-300")
      })
  
      const targetPage = document.getElementById(`${pageName}-page`)
      if (targetPage) {
        targetPage.classList.remove("hidden")
      }
  
      const activeLink = document.querySelector(`[data-page="${pageName}"]`)
      if (activeLink) {
        activeLink.classList.remove("text-gray-300")
        activeLink.classList.add("active", "bg-gray-700", "text-yellow-400")
      }
  
      this.currentPage = pageName
  
      if (pageName === "dashboard" && window.dashboard) {
        setTimeout(() => {
          window.dashboard.refresh()
        }, 100)
      } else if (pageName === "reports") {
        this.updateRecentActivities()
        this.updateSecurityAlerts()
      }
    }
  
    closeModals() {
      document.querySelectorAll(".fixed.inset-0").forEach((modal) => {
        if (modal.id !== "loading-screen") {
          modal.classList.add("hidden")
          modal.classList.remove("flex")
        }
      })
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado, inicializando aplicação...")
    const app = new WayneIndustriesApp()
    app.init()
  })
  
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    })
  }
  