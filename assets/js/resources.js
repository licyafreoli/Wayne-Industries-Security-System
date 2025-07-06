class ResourceManager {
    constructor() {
      this.resources = JSON.parse(localStorage.getItem("systemResources")) || [
        {
          id: 1,
          name: "Batmóvel",
          type: "veiculo",
          location: "Garagem Principal",
          status: "ativo",
          lastMaintenance: "2024-01-10",
        },
        {
          id: 2,
          name: "Sistema de Vigilância Torre Wayne",
          type: "seguranca",
          location: "Torre Wayne",
          status: "ativo",
          lastMaintenance: "2024-01-12",
        },
        {
          id: 3,
          name: "Computador Principal",
          type: "equipamento",
          location: "Batcaverna",
          status: "ativo",
          lastMaintenance: "2024-01-08",
        },
        {
          id: 4,
          name: "Batwing",
          type: "veiculo",
          location: "Hangar Secreto",
          status: "manutencao",
          lastMaintenance: "2024-01-14",
        },
        {
          id: 5,
          name: "Sensores de Movimento",
          type: "seguranca",
          location: "Perímetro Externo",
          status: "ativo",
          lastMaintenance: "2024-01-11",
        },
        {
          id: 6,
          name: "Servidor de Backup",
          type: "equipamento",
          location: "Sala de Servidores",
          status: "inativo",
          lastMaintenance: "2024-01-05",
        },
      ]
      this.currentFilter = ""
    }
  
    init() {
      this.renderResources()
      this.setupEventListeners()
    }
  
    renderResources() {
      const grid = document.getElementById("resources-grid")
      if (!grid) return
  
      grid.innerHTML = ""
  
      const filteredResources = this.currentFilter
        ? this.resources.filter((r) => r.type === this.currentFilter)
        : this.resources
  
      // Verificar permissões do usuário atual
      const currentUser = window.authManager ? window.authManager.getCurrentUser() : null
      const canEdit = currentUser && (currentUser.type === "admin" || currentUser.type === "manager")
      const canDelete = currentUser && currentUser.type === "admin"
  
      filteredResources.forEach((resource) => {
        const card = document.createElement("div")
        card.className =
          "bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/10"
        card.innerHTML = `
                  <div class="flex justify-between items-start mb-4">
                      <div class="flex items-center">
                          <div class="p-3 rounded-full bg-yellow-400 bg-opacity-20 mr-3">
                              <i class="fas fa-${this.getResourceIcon(resource.type)} text-yellow-400 text-xl"></i>
                          </div>
                          <div>
                              <h3 class="text-lg font-semibold text-white">${resource.name}</h3>
                              <p class="text-gray-400 text-sm">${this.getTypeLabel(resource.type)}</p>
                          </div>
                      </div>
                      <div class="flex space-x-2">
                          ${
                            canEdit
                              ? `
                              <button onclick="window.resourceManager.editResource(${resource.id})" class="text-yellow-400 hover:text-yellow-300 transition-colors" title="Editar recurso">
                                  <i class="fas fa-edit"></i>
                              </button>
                          `
                              : ""
                          }
                          ${
                            canDelete
                              ? `
                              <button onclick="window.resourceManager.deleteResource(${resource.id})" class="text-red-400 hover:text-red-300 transition-colors" title="Excluir recurso">
                                  <i class="fas fa-trash"></i>
                              </button>
                          `
                              : ""
                          }
                          ${!canEdit && !canDelete ? '<span class="text-gray-500 text-xs">Visualização</span>' : ""}
                      </div>
                  </div>
                  
                  <div class="space-y-2">
                      <div class="flex justify-between">
                          <span class="text-gray-400">Localização:</span>
                          <span class="text-white">${resource.location}</span>
                      </div>
                      <div class="flex justify-between">
                          <span class="text-gray-400">Status:</span>
                          <span class="px-2 py-1 rounded-full text-xs font-medium ${this.getStatusBadgeClass(resource.status)}">
                              ${this.getStatusLabel(resource.status)}
                          </span>
                      </div>
                      <div class="flex justify-between">
                          <span class="text-gray-400">Última Manutenção:</span>
                          <span class="text-white">${new Date(resource.lastMaintenance).toLocaleDateString("pt-BR")}</span>
                      </div>
                  </div>
                  
                  <div class="mt-4 pt-4 border-t border-gray-700">
                      ${
                        canEdit
                          ? `
                          <button onclick="window.resourceManager.scheduleMaintenace(${resource.id})" class="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                              <i class="fas fa-wrench mr-2"></i>Agendar Manutenção
                          </button>
                      `
                          : `
                          <div class="w-full bg-gray-600 text-gray-400 py-2 px-4 rounded-lg text-center">
                              <i class="fas fa-eye mr-2"></i>Apenas Visualização
                          </div>
                      `
                      }
                  </div>
              `
        grid.appendChild(card)
      })
    }
  
    getResourceIcon(type) {
      const icons = {
        equipamento: "desktop",
        veiculo: "car",
        seguranca: "shield-alt",
      }
      return icons[type] || "box"
    }
  
    getTypeLabel(type) {
      const labels = {
        equipamento: "Equipamento",
        veiculo: "Veículo",
        seguranca: "Dispositivo de Segurança",
      }
      return labels[type] || type
    }
  
    getStatusLabel(status) {
      const labels = {
        ativo: "Ativo",
        manutencao: "Em Manutenção",
        inativo: "Inativo",
      }
      return labels[status] || status
    }
  
    getStatusBadgeClass(status) {
      const classes = {
        ativo: "bg-green-500 bg-opacity-20 text-green-400",
        manutencao: "bg-yellow-500 bg-opacity-20 text-yellow-400",
        inativo: "bg-red-500 bg-opacity-20 text-red-400",
      }
      return classes[status] || "bg-gray-500 bg-opacity-20 text-gray-400"
    }
  
    setupEventListeners() {
      const addResourceBtn = document.getElementById("add-resource-btn")
      const resourceForm = document.getElementById("resource-form")
      const cancelResourceBtn = document.getElementById("cancel-resource")
      const resourceFilter = document.getElementById("resource-filter")
  
      // Verificar se o usuário tem permissão para adicionar recursos
      const currentUser = window.authManager ? window.authManager.getCurrentUser() : null
      const canAddResources = currentUser && (currentUser.type === "admin" || currentUser.type === "manager")
  
      if (addResourceBtn) {
        if (canAddResources) {
          addResourceBtn.addEventListener("click", () => {
            this.showResourceModal()
          })
        } else {
          addResourceBtn.style.display = "none"
        }
      }
  
      if (resourceForm) {
        resourceForm.addEventListener("submit", (e) => {
          e.preventDefault()
          this.saveResource()
        })
      }
  
      if (cancelResourceBtn) {
        cancelResourceBtn.addEventListener("click", () => {
          this.hideResourceModal()
        })
      }
  
      if (resourceFilter) {
        resourceFilter.addEventListener("change", (e) => {
          this.currentFilter = e.target.value
          this.renderResources()
        })
      }
    }
  
    showResourceModal(resource = null) {
      const modal = document.getElementById("resource-modal")
      if (!modal) return
  
      modal.classList.remove("hidden")
      modal.classList.add("flex")
  
      if (resource) {
        const nameInput = document.getElementById("resource-name")
        const typeSelect = document.getElementById("resource-type")
        const locationInput = document.getElementById("resource-location")
        const statusSelect = document.getElementById("resource-status")
  
        if (nameInput) nameInput.value = resource.name
        if (typeSelect) typeSelect.value = resource.type
        if (locationInput) locationInput.value = resource.location
        if (statusSelect) statusSelect.value = resource.status
      } else {
        const form = document.getElementById("resource-form")
        if (form) form.reset()
      }
    }
  
    hideResourceModal() {
      const modal = document.getElementById("resource-modal")
      if (!modal) return
  
      modal.classList.add("hidden")
      modal.classList.remove("flex")
    }
  
    saveResource() {
      const nameInput = document.getElementById("resource-name")
      const typeSelect = document.getElementById("resource-type")
      const locationInput = document.getElementById("resource-location")
      const statusSelect = document.getElementById("resource-status")
  
      if (!nameInput || !typeSelect || !locationInput || !statusSelect) {
        alert("Erro: Elementos do formulário não encontrados.")
        return
      }
  
      const name = nameInput.value
      const type = typeSelect.value
      const location = locationInput.value
      const status = statusSelect.value
  
      if (!name || !location) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }
  
      const newResource = {
        id: Date.now(),
        name,
        type,
        location,
        status,
        lastMaintenance: new Date().toISOString().split("T")[0],
      }
  
      this.resources.push(newResource)
      this.saveToStorage()
      this.renderResources()
      this.hideResourceModal()
  
      this.showNotification("Recurso adicionado com sucesso!", "success")
    }
  
    editResource(id) {
      const resource = this.resources.find((r) => r.id === id)
      if (resource) {
        this.showResourceModal(resource)
      }
    }
  
    deleteResource(id) {
      if (confirm("Tem certeza que deseja excluir este recurso?")) {
        this.resources = this.resources.filter((r) => r.id !== id)
        this.saveToStorage()
        this.renderResources()
        this.showNotification("Recurso excluído com sucesso!", "success")
      }
    }
  
    scheduleMaintenace(id) {
      const resource = this.resources.find((r) => r.id === id)
      if (resource) {
        resource.status = "manutencao"
        resource.lastMaintenance = new Date().toISOString().split("T")[0]
        this.saveToStorage()
        this.renderResources()
        this.showNotification("Manutenção agendada com sucesso!", "info")
      }
    }
  
    saveToStorage() {
      localStorage.setItem("systemResources", JSON.stringify(this.resources))
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
  window.resourceManager = new ResourceManager()
  