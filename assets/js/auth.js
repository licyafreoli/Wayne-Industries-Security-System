class AuthManager {
    constructor() {
      this.currentUser = null
      this.users = [
        { username: "admin", password: "senha123", name: "Bruce Wayne", type: "admin" },
        { username: "manager", password: "senha123", name: "Alfred Pennyworth", type: "manager" },
        { username: "employee", password: "senha123", name: "Lucius Fox", type: "employee" },
      ]
      console.log("AuthManager inicializado com usuários:", this.users)
    }
  
    login(username, password) {
      console.log("Tentativa de login:", { username, password })
      console.log("Usuários disponíveis:", this.users)
  
      const user = this.users.find((u) => u.username === username && u.password === password)
      console.log("Usuário encontrado:", user)
  
      if (user) {
        this.currentUser = user
        localStorage.setItem("currentUser", JSON.stringify(user))
        console.log("Login bem-sucedido para:", user.name)
        return true
      }
      console.log("Login falhou - credenciais inválidas")
      return false
    }
  
    logout() {
      this.currentUser = null
      localStorage.removeItem("currentUser")
      console.log("Logout realizado")
    }
  
    getCurrentUser() {
      if (!this.currentUser) {
        const stored = localStorage.getItem("currentUser")
        if (stored) {
          this.currentUser = JSON.parse(stored)
        }
      }
      return this.currentUser
    }
  
    isAuthenticated() {
      const authenticated = this.getCurrentUser() !== null
      console.log("Usuário autenticado:", authenticated)
      return authenticated
    }
  
    hasPermission(requiredLevel) {
      const user = this.getCurrentUser()
      if (!user) return false
  
      const levels = { employee: 1, manager: 2, admin: 3 }
      return levels[user.type] >= levels[requiredLevel]
    }
  }
  
  window.authManager = new AuthManager()
  console.log("AuthManager disponível globalmente:", window.authManager)
  