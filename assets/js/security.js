class SecurityManager {
    constructor() {
      this.users = JSON.parse(localStorage.getItem("systemUsers")) || [
        {
          id: 1,
          name: "Bruce Wayne",
          username: "bwayne",
          type: "admin",
          status: "ativo",
          lastAccess: "2024-01-15 14:30",
        },
        {
          id: 2,
          name: "Alfred Pennyworth",
          username: "apennyworth",
          type: "manager",
          status: "ativo",
          lastAccess: "2024-01-15 13:45",
        },
        {
          id: 3,
          name: "Lucius Fox",
          username: "lfox",
          type: "employee",
          status: "ativo",
          lastAccess: "2024-01-15 12:20",
        },
        {
          id: 4,
          name: "Dick Grayson",
          username: "dgrayson",
          type: "employee",
          status: "inativo",
          lastAccess: "2024-01-14 18:15",
        },
      ]
      this.currentFilter = ""
    }
  
    init() {
      this.renderUsersTable()
      this.setupEventListeners()
    }
  
    renderUsersTable() {
      const tbody = document.getElementById("users-table-body")
      if (!tbody) return
  
      tbody.innerHTML = ""
  
      this.users.forEach((user) => {
        const row = document.createElement("tr")
        row.className = "hover:bg-gray-700 hover:bg-opacity-50 transition-colors"
  
        // Verificar permissões do usuário atual
        const currentUser = window.authManager ? window.authManager.getCurrentUser() : null
        const canEdit = currentUser && (currentUser.type === "admin" || currentUser.type === "manager")
        const canDelete = currentUser && currentUser.type === "admin"
  
        row.innerHTML = `
                  <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10">
                              <div class="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center">
                                  <i class="fas fa-user text-black"></i>
                              </div>
                          </div>
                          <div class="ml-4">
                              <div class="text-sm font-medium text-white">${user.name}</div>
                              <div class="text-sm text-gray-400">${user.username}</div>
                          </div>
                      </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 rounded-full text-xs font-medium ${this.getUserTypeBadgeClass(user.type)}">${this.getUserTypeLabel(user.type)}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 rounded-full text-xs font-medium ${user.status === "ativo" ? "bg-green-500 bg-opacity-20 text-green-400" : "bg-red-500 bg-opacity-20 text-red-400"}">
                          ${user.status === "ativo" ? "Ativo" : "Inativo"}
                      </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      ${user.lastAccess}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      ${
                        canEdit
                          ? `
                          <button onclick="window.securityManager.editUser(${user.id})" class="text-yellow-400 hover:text-yellow-300 mr-3 transition-colors" title="Editar usuário">
                              <i class="fas fa-edit"></i>
                          </button>
                          <button onclick="window.securityManager.toggleUserStatus(${user.id})" class="text-blue-400 hover:text-blue-300 mr-3 transition-colors" title="${user.status === "ativo" ? "Desativar" : "Ativar"} usuário">
                              <i class="fas fa-${user.status === "ativo" ? "pause" : "play"}"></i>
                          </button>
                      `
                          : ""
                      }
                      ${
                        canDelete
                          ? `
                          <button onclick="window.securityManager.deleteUser(${user.id})" class="text-red-400 hover:text-red-300 transition-colors" title="Excluir usuário">
                              <i class="fas fa-trash"></i>
                          </button>
                      `
                          : ""
                      }
                      ${!canEdit && !canDelete ? '<span class="text-gray-500 text-sm">Sem permissão</span>' : ""}
                  </td>
              `
        tbody.appendChild(row)
      })
    }
  
    getUserTypeBadgeClass(type) {
      const classes = {
        admin: "bg-red-500 bg-opacity-20 text-red-400",
        manager: "bg-blue-500 bg-opacity-20 text-blue-400",
        employee: "bg-green-500 bg-opacity-20 text-green-400",
      }
      return classes[type] || "bg-gray-500 bg-opacity-20 text-gray-400"
    }
  
    getUserTypeLabel(type) {
      const labels = {
        admin: "Administrador",
        manager: "Gerente",
        employee: "Funcionário",
      }
      return labels[type] || type
    }
  
    setupEventListeners() {
      const addUserBtn = document.getElementById("add-user-btn")
      const userForm = document.getElementById("user-form")
      const cancelUserBtn = document.getElementById("cancel-user")
  
      // Verificar se o usuário tem permissão para adicionar usuários
      const currentUser = window.authManager ? window.authManager.getCurrentUser() : null
      const canAddUsers = currentUser && (currentUser.type === "admin" || currentUser.type === "manager")
  
      if (addUserBtn) {
        if (canAddUsers) {
          addUserBtn.addEventListener("click", () => {
            this.showUserModal()
          })
        } else {
          addUserBtn.style.display = "none"
        }
      }
  
      if (userForm) {
        userForm.addEventListener("submit", (e) => {
          e.preventDefault()
          this.saveUser()
        })
      }
  
      if (cancelUserBtn) {
        cancelUserBtn.addEventListener("click", () => {
          this.hideUserModal()
        })
      }
    }
  
    showUserModal(user = null) {
      const modal = document.getElementById("user-modal")
      if (!modal) return
  
      modal.classList.remove("hidden")
      modal.classList.add("flex")
  
      if (user) {
        const nameInput = document.getElementById("user-name")
        const usernameInput = document.getElementById("user-username")
        const typeSelect = document.getElementById("user-type")
  
        if (nameInput) nameInput.value = user.name
        if (usernameInput) usernameInput.value = user.username
        if (typeSelect) typeSelect.value = user.type
      } else {
        const form = document.getElementById("user-form")
        if (form) form.reset()
      }
    }
  
    hideUserModal() {
      const modal = document.getElementById("user-modal")
      if (!modal) return
  
      modal.classList.add("hidden")
      modal.classList.remove("flex")
    }
  
    saveUser() {
      const nameInput = document.getElementById("user-name")
      const usernameInput = document.getElementById("user-username")
      const typeSelect = document.getElementById("user-type")
  
      if (!nameInput || !usernameInput || !typeSelect) {
        alert("Erro: Elementos do formulário não encontrados.")
        return
      }
  
      const name = nameInput.value
      const username = usernameInput.value
      const type = typeSelect.value
  
      if (!name || !username) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }
  
      const newUser = {
        id: Date.now(),
        name,
        username,
        type,
        status: "ativo",
        lastAccess: new Date().toLocaleString("pt-BR"),
      }
  
      this.users.push(newUser)
      this.saveToStorage()
      this.renderUsersTable()
      this.hideUserModal()
  
      this.showNotification("Usuário adicionado com sucesso!", "success")
    }
  
    editUser(id) {
      const user = this.users.find((u) => u.id === id)
      if (user) {
        this.showUserModal(user)
      }
    }
  
    toggleUserStatus(id) {
      const user = this.users.find((u) => u.id === id)
      if (user) {
        user.status = user.status === "ativo" ? "inativo" : "ativo"
        this.saveToStorage()
        this.renderUsersTable()
  
        const action = user.status === "ativo" ? "ativado" : "desativado"
        this.showNotification(`Usuário ${action} com sucesso!`, "info")
      }
    }
  
    deleteUser(id) {
      if (confirm("Tem certeza que deseja excluir este usuário?")) {
        this.users = this.users.filter((u) => u.id !== id)
        this.saveToStorage()
        this.renderUsersTable()
        this.showNotification("Usuário excluído com sucesso!", "success")
      }
    }
  
    saveToStorage() {
      localStorage.setItem("systemUsers", JSON.stringify(this.users))
    }
  
    showNotification(message, type) {
      const notification = document.createElement("div")
      notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
        type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"
      }`
      notification.textContent = message
  
      document.body.appendChild(notification)
  
      setTimeout(() => {
        notification.remove()
      }, 3000)
    }
  }
  
  // Criar instância global
  window.securityManager = new SecurityManager()
  