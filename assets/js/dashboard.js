import { Chart } from "@/components/ui/chart"
class Dashboard {
  constructor() {
    this.accessChart = null
    this.resourceChart = null
    this.accessData = {
      peak: 42,
      average: 28,
      total: 672,
    }
    this.resourceData = {
      equipments: 45,
      vehicles: 25,
      security: 30,
    }
  }

  init() {
    this.updateStats()
    this.updateAccessInfo()
    this.updateResourceInfo()
    // Aguardar o Chart.js carregar antes de criar os gráficos
    this.waitForChartJS()
    this.startRealTimeUpdates()
  }

  waitForChartJS() {
    if (typeof Chart !== "undefined") {
      setTimeout(() => {
        this.createCharts()
      }, 500)
    } else {
      setTimeout(() => {
        this.waitForChartJS()
      }, 100)
    }
  }

  updateStats() {
    const stats = {
      activeUsers: Math.floor(Math.random() * 50) + 100,
      totalResources: Math.floor(Math.random() * 100) + 1200,
      activeAlerts: Math.floor(Math.random() * 5) + 1,
    }

    const activeUsersEl = document.getElementById("active-users")
    const totalResourcesEl = document.getElementById("total-resources")
    const activeAlertsEl = document.getElementById("active-alerts")

    if (activeUsersEl) activeUsersEl.textContent = stats.activeUsers
    if (totalResourcesEl) totalResourcesEl.textContent = stats.totalResources.toLocaleString()
    if (activeAlertsEl) activeAlertsEl.textContent = stats.activeAlerts
  }

  updateAccessInfo() {
    // Atualizar informações de acesso com dados dinâmicos
    this.accessData.peak = 35 + Math.floor(Math.random() * 20)
    this.accessData.average = 25 + Math.floor(Math.random() * 10)
    this.accessData.total = this.accessData.average * 24 + Math.floor(Math.random() * 100)

    const peakEl = document.getElementById("peak-access")
    const avgEl = document.getElementById("avg-access")
    const totalEl = document.getElementById("total-access")

    if (peakEl) peakEl.textContent = this.accessData.peak
    if (avgEl) avgEl.textContent = this.accessData.average
    if (totalEl) totalEl.textContent = this.accessData.total
  }

  updateResourceInfo() {
    // Pequenas variações nos recursos
    this.resourceData.equipments = 40 + Math.floor(Math.random() * 10)
    this.resourceData.vehicles = 20 + Math.floor(Math.random() * 10)
    this.resourceData.security = 25 + Math.floor(Math.random() * 10)

    const equipmentEl = document.getElementById("equipment-count")
    const vehicleEl = document.getElementById("vehicle-count")
    const securityEl = document.getElementById("security-count")

    if (equipmentEl) equipmentEl.textContent = this.resourceData.equipments
    if (vehicleEl) vehicleEl.textContent = this.resourceData.vehicles
    if (securityEl) securityEl.textContent = this.resourceData.security
  }

  createCharts() {
    console.log("Criando gráficos...")
    this.createAccessChart()
    this.createResourceChart()
  }

  createAccessChart() {
    const canvas = document.getElementById("accessChart")
    if (!canvas) {
      console.error("Canvas accessChart não encontrado")
      return
    }

    const ctx = canvas.getContext("2d")

    // Dados simulados de acessos por hora (últimas 24 horas)
    const hours = []
    const accessData = []
    const currentHour = new Date().getHours()

    for (let i = 0; i < 24; i++) {
      const hour = (currentHour - 23 + i + 24) % 24
      hours.push(`${hour.toString().padStart(2, "0")}:00`)

      // Simular padrão realista de acessos (mais durante horário comercial)
      let baseAccess = 5
      if (hour >= 8 && hour <= 18) {
        baseAccess = 25 + Math.floor(Math.random() * 30)
      } else if (hour >= 19 && hour <= 23) {
        baseAccess = 10 + Math.floor(Math.random() * 15)
      } else {
        baseAccess = 2 + Math.floor(Math.random() * 8)
      }
      accessData.push(baseAccess)
    }

    try {
      if (this.accessChart) {
        this.accessChart.destroy()
      }

      this.accessChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: hours,
          datasets: [
            {
              label: "Acessos por Hora",
              data: accessData,
              borderColor: "#fbbf24",
              backgroundColor: "rgba(251, 191, 36, 0.1)",
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#fbbf24",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "#ffffff",
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "#ffffff",
              bodyColor: "#ffffff",
              borderColor: "#fbbf24",
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Horário",
                color: "#9ca3af",
              },
              ticks: {
                color: "#9ca3af",
                maxTicksLimit: 12,
              },
              grid: {
                color: "#374151",
                drawBorder: false,
              },
            },
            y: {
              title: {
                display: true,
                text: "Número de Acessos",
                color: "#9ca3af",
              },
              ticks: {
                color: "#9ca3af",
                beginAtZero: true,
              },
              grid: {
                color: "#374151",
                drawBorder: false,
              },
            },
          },
        },
      })
      console.log("Gráfico de acessos criado com sucesso")
    } catch (error) {
      console.error("Erro ao criar gráfico de acessos:", error)
    }
  }

  createResourceChart() {
    const canvas = document.getElementById("resourceChart")
    if (!canvas) {
      console.error("Canvas resourceChart não encontrado")
      return
    }

    const ctx = canvas.getContext("2d")

    try {
      if (this.resourceChart) {
        this.resourceChart.destroy()
      }

      this.resourceChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Equipamentos", "Veículos", "Dispositivos de Segurança"],
          datasets: [
            {
              data: [this.resourceData.equipments, this.resourceData.vehicles, this.resourceData.security],
              backgroundColor: [
                "#10b981", // Verde para equipamentos
                "#3b82f6", // Azul para veículos
                "#f59e0b", // Amarelo para segurança
              ],
              borderColor: "#1f2937",
              borderWidth: 3,
              hoverBorderWidth: 4,
              hoverBorderColor: "#ffffff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#ffffff",
                padding: 20,
                font: {
                  size: 12,
                },
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "#ffffff",
              bodyColor: "#ffffff",
              borderColor: "#fbbf24",
              borderWidth: 1,
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.parsed
                  const total = context.dataset.data.reduce((a, b) => a + b, 0)
                  const percentage = ((value / total) * 100).toFixed(1)
                  return `${label}: ${value} (${percentage}%)`
                },
              },
            },
          },
          cutout: "60%",
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        },
      })
      console.log("Gráfico de recursos criado com sucesso")
    } catch (error) {
      console.error("Erro ao criar gráfico de recursos:", error)
    }
  }

  startRealTimeUpdates() {
    // Atualizar estatísticas a cada 30 segundos
    setInterval(() => {
      this.updateStats()
      this.updateAccessInfo()
      this.updateResourceInfo()
    }, 30000)

    // Atualizar dados dos gráficos a cada 5 minutos
    setInterval(() => {
      this.updateChartData()
    }, 300000)
  }

  updateChartData() {
    if (this.accessChart) {
      // Simular novos dados de acesso
      const newData = this.accessChart.data.datasets[0].data.map((value, index) => {
        const hour = Number.parseInt(this.accessChart.data.labels[index].split(":")[0])
        let baseAccess = 5
        if (hour >= 8 && hour <= 18) {
          baseAccess = 25 + Math.floor(Math.random() * 30)
        } else if (hour >= 19 && hour <= 23) {
          baseAccess = 10 + Math.floor(Math.random() * 15)
        } else {
          baseAccess = 2 + Math.floor(Math.random() * 8)
        }
        return baseAccess
      })

      this.accessChart.data.datasets[0].data = newData
      this.accessChart.update("none") // Animação suave
    }

    if (this.resourceChart) {
      // Atualizar com os novos dados de recursos
      this.resourceChart.data.datasets[0].data = [
        this.resourceData.equipments,
        this.resourceData.vehicles,
        this.resourceData.security,
      ]
      this.resourceChart.update("none")
    }
  }

  // Método para atualizar quando a página dashboard for mostrada
  refresh() {
    this.updateStats()
    this.updateAccessInfo()
    this.updateResourceInfo()
    if (this.accessChart) {
      this.accessChart.resize()
    }
    if (this.resourceChart) {
      this.resourceChart.resize()
    }
  }
}

// Criar instância global
window.dashboard = new Dashboard()
