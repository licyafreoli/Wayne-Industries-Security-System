# Sistema de Gerenciamento de Segurança - Wayne Industries

## 📋 Descrição do Projeto

Sistema completo de gerenciamento de segurança desenvolvido para as Indústrias Wayne, oferecendo controle de acesso, gestão de recursos e dashboard de visualização em tempo real.

## 🚀 Funcionalidades

### 1. Sistema de Controle de Acesso
- Autenticação de usuários com diferentes níveis de permissão
- Gerenciamento de funcionários, gerentes e administradores
- Controle de status de usuários (ativo/inativo)
- Histórico de acessos

### 2. Gestão de Recursos
- Inventário de equipamentos, veículos e dispositivos de segurança
- Controle de localização e status dos recursos
- Agendamento de manutenções
- Filtros por categoria

### 3. Dashboard de Visualização
- Estatísticas em tempo real
- Gráficos de acessos por hora
- Distribuição de recursos por categoria
- Alertas de segurança
- Atividades recentes

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, JavaScript (ES6+), Tailwind CSS
- **Charts**: Chart.js
- **Icons**: Font Awesome
- **Storage**: LocalStorage
- **PWA**: Service Worker para funcionalidade offline

## 📁 Estrutura do Projeto

\`\`\`
wayne-industries-system/
├── index.html                 # Página principal com Tailwind CSS
├── sw.js                     # Service Worker
├── package.json              # Configurações do projeto
├── README.md                 # Documentação
└── assets/
    └── js/
        ├── app.js            # Controlador principal
        ├── auth.js           # Módulo de autenticação
        ├── dashboard.js      # Módulo do dashboard
        ├── security.js       # Módulo de segurança
        └── resources.js      # Módulo de recursos
\`\`\`

## 🔧 Instalação e Execução

### Pré-requisitos
- Navegador web moderno
- Servidor HTTP local (opcional)

### Passos para instalação

1. **Clone ou baixe o projeto**
   \`\`\`bash
   git clone [url-do-repositorio]
   cd wayne-industries-system
   \`\`\`

2. **Opção 1: Abrir diretamente no navegador**
   - Abra o arquivo `index.html` diretamente no navegador

3. **Opção 2: Usar servidor local (recomendado)**
   \`\`\`bash
   # Com Python
   python -m http.server 3000
   
   # Com Node.js (http-server)
   npx http-server . -p 3000
   
   # Com PHP
   php -S localhost:3000
   \`\`\`

4. **Acesse o sistema**
   - Abra o navegador em `http://localhost:3000` (se usando servidor)
   - Ou abra o arquivo `index.html` diretamente

### Usuários de Teste

| Usuário | Senha | Tipo | Permissões |
|---------|-------|------|------------|
| admin | senha123 | Administrador | Acesso total ao sistema |
| manager | senha123 | Gerente | Gestão de recursos e usuários |
| employee | senha123 | Funcionário | Visualização de dados |

## 🔐 Níveis de Permissão

### Administrador
- Acesso completo ao sistema
- Gerenciamento de todos os usuários
- Configurações de segurança
- Relatórios avançados

### Gerente
- Gestão de recursos
- Visualização de relatórios
- Gerenciamento de funcionários
- Agendamento de manutenções

### Funcionário
- Visualização do dashboard
- Acesso aos recursos básicos
- Consulta de informações

## 📊 Funcionalidades Detalhadas

### Controle de Acesso
- **CRUD de Usuários**: Criar, visualizar, editar e excluir usuários
- **Controle de Status**: Ativar/desativar usuários
- **Histórico de Acessos**: Registro de últimos acessos

### Gestão de Recursos
- **Inventário Completo**: Equipamentos, veículos, dispositivos de segurança
- **Controle de Localização**: Rastreamento de onde cada recurso está localizado
- **Status de Manutenção**: Ativo, em manutenção, inativo
- **Agendamento**: Sistema de agendamento de manutenções

## 🎨 Design e UX

### Tailwind CSS
- Interface moderna com classes utilitárias
- Cores da identidade Wayne Industries (preto e amarelo)
- Design responsivo para desktop e mobile
- Zero CSS customizado - 100% Tailwind

### Animações e Transições
- Loading screen com animação
- Transições suaves entre páginas
- Hover effects nos elementos interativos
- Animações nativas do Tailwind

## 🔧 Arquitetura do Sistema

### JavaScript Modular
- **auth.js**: Gerenciamento de autenticação e autorização
- **dashboard.js**: Controle do dashboard e gráficos
- **security.js**: Módulo de controle de acesso
- **resources.js**: Gestão de recursos e inventário
- **app.js**: Controlador principal da aplicação

### Armazenamento Local
- Utiliza LocalStorage para persistência de dados
- Simulação de banco de dados no frontend
- Dados mantidos entre sessões

### PWA (Progressive Web App)
- Service Worker para funcionalidade offline
- Cache de recursos estáticos
- Instalável como aplicativo

## 🚨 Recursos de Segurança

### Autenticação
- Sistema de login com validação
- Controle de sessão
- Logout automático por inatividade

### Autorização
- Diferentes níveis de acesso
- Controle de permissões por funcionalidade
- Validação de ações baseada no tipo de usuário

### Monitoramento
- Log de atividades do sistema
- Alertas de segurança em tempo real
- Histórico de acessos e modificações

## 📱 Responsividade

### Mobile First
- Design adaptável para dispositivos móveis
- Navegação otimizada para touch
- Sidebar colapsível em telas pequenas

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔄 Atualizações em Tempo Real

### Dashboard Dinâmico
- Estatísticas atualizadas automaticamente
- Gráficos com dados simulados em tempo real
- Notificações de novos alertas

### Sincronização
- Dados sincronizados entre abas
- Atualizações refletidas instantaneamente
- Estado consistente da aplicação

## 🧪 Testes e Validação

### Funcionalidades Testadas
- ✅ Sistema de login/logout
- ✅ Navegação entre páginas
- ✅ CRUD de usuários e recursos
- ✅ Gráficos e visualizações
- ✅ Responsividade
- ✅ Funcionalidade offline

## 🚀 Deploy e Produção

### Hospedagem Recomendada
- **Vercel**: Deploy automático e CDN global
- **Netlify**: Integração com Git e builds automáticos
- **GitHub Pages**: Hospedagem gratuita para projetos estáticos

### Configurações de Produção
1. Minificação de JavaScript
2. Otimização de imagens
3. Configuração de HTTPS
4. Headers de segurança

## 📈 Melhorias Futuras

### Backend Integration
- API REST para persistência real de dados
- Banco de dados PostgreSQL ou MongoDB
- Autenticação JWT

### Funcionalidades Avançadas
- Notificações push
- Relatórios em PDF
- Integração com câmeras de segurança
- Sistema de backup automático

### Analytics
- Google Analytics para métricas de uso
- Dashboards de performance
- Monitoramento de erros

## 🤝 Contribuição

### Como Contribuir
1. Fork do projeto
2. Criar branch para feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit das mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para branch (`git push origin feature/nova-funcionalidade`)
5. Abrir Pull Request

### Padrões de Código
- ESLint para JavaScript
- Prettier para formatação
- Comentários em português
- Nomenclatura descritiva

## 📞 Suporte

### Contato
- **Email**: suporte@wayneindustries.com
- **Telefone**: (11) 9999-9999
- **Documentação**: [linkherehaha]

### Issues
- Reporte bugs através do GitHub Issues
- Sugestões de melhorias são bem-vindas
- Documentação de problemas conhecidos

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

---

**Desenvolvido com 🦇 pelas Indústrias Wayne**

*"It's not who I am underneath, but what I do that defines me." - Batman*
