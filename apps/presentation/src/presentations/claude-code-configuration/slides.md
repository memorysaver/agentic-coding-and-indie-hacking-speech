---
# Configuration theme & layout
theme: default
layout: cover
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Claude Code Configuration
  
  Mastering AI-Powered Development in Your Terminal

drawings:
  enabled: true
  persist: false
transition: slide-left
title: Claude Code Configuration
mdc: true
---

<style>
.slidev-layout.cover {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 25%, #21262d 50%, #1a1e24 75%, #0d1117 100%);
  position: relative;
  overflow: hidden;
}

.slidev-layout.cover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(88, 166, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(139, 233, 253, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 70%, rgba(158, 206, 106, 0.06) 0%, transparent 50%);
  z-index: -1;
}

.terminal-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image: 
    linear-gradient(rgba(139, 233, 253, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 233, 253, 0.3) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: -1;
}

.title-container {
  position: relative;
  z-index: 10;
}

.main-title {
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #58a6ff 0%, #8be9fd 50%, #9ecf66 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(139, 233, 253, 0.3);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #c9d1d9;
  font-weight: 300;
  margin-bottom: 3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.terminal-prompt {
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
  background: rgba(13, 17, 23, 0.8);
  border: 1px solid rgba(139, 233, 253, 0.2);
  border-radius: 8px;
  padding: 1rem 1.5rem;
  color: #8be9fd;
  font-size: 1.1rem;
  margin: 2rem auto;
  max-width: 600px;
  text-align: left;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.cursor::after {
  content: '█';
  animation: blink 1s infinite;
  color: #58a6ff;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.navigation-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(201, 209, 217, 0.6);
  font-size: 0.9rem;
  font-weight: 300;
}

.branding {
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
  color: rgba(201, 209, 217, 0.4);
  font-size: 0.8rem;
}
</style>

<div class="terminal-grid"></div>

<div class="title-container">
  <h1 class="main-title">Claude Code Configuration</h1>
  <p class="subtitle">Mastering AI-Powered Development in Your Terminal</p>
  
  <div class="terminal-prompt">
    <span style="color: #9ecf66;">$</span> npm i -g @anthropic-ai/claude-code<span class="cursor"></span>
  </div>
</div>

<div class="navigation-hint">
  Press <kbd style="background: rgba(139, 233, 253, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">Space</kbd> to continue
</div>

<div class="branding">
  Built with <a href="https://sli.dev" target="_blank" style="color: #58a6ff;">Slidev</a> & Claude Code
</div>

---
transition: fade-out
---

<style>
.considerations-slide {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%);
  padding: 2rem;
  min-height: 100vh;
}

.considerations-title {
  font-size: 2.8rem;
  font-weight: 600;
  background: linear-gradient(135deg, #58a6ff 0%, #8be9fd 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 2rem;
  padding-top: 1rem;
}

.considerations-list {
  max-width: 800px;
  margin: 0 auto;
  list-style: none;
  padding: 0;
}

.considerations-list li {
  background: rgba(13, 17, 23, 0.6);
  border: 1px solid rgba(139, 233, 253, 0.2);
  border-radius: 12px;
  padding: 1.5rem 2rem 1.5rem 4rem;
  margin-bottom: 1.5rem;
  color: #c9d1d9;
  font-size: 1.3rem;
  line-height: 1.6;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
}

.considerations-list li:hover {
  border-color: rgba(139, 233, 253, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.considerations-list li::before {
  content: counter(consideration);
  counter-increment: consideration;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #58a6ff 0%, #8be9fd 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  color: #0d1117;
  box-shadow: 0 4px 12px rgba(88, 166, 255, 0.3);
}

.considerations-list {
  counter-reset: consideration;
}
</style>

<div class="considerations-slide">
  <h1 class="considerations-title">What to Consider for the Configuration</h1>
  
  <ol class="considerations-list">
    <li>The version control to validate the result</li>
    <li>Run the dev server with terminal</li>
    <li>The main Claude Code window</li>
  </ol>
</div>

---
layout: default
---

<style>
.slidev-layout {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #58a6ff 0%, #8be9fd 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  text-align: center;
}

.config-image-container {
  position: relative;
  max-width: 75%;
  margin: 0 auto 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(139, 233, 253, 0.2);
  background: rgba(13, 17, 23, 0.8);
}

.config-image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(90deg, #ff5f56 0%, #ffbd2e 50%, #27ca3f 100%);
  border-radius: 12px 12px 0 0;
  z-index: 1;
}

.config-image-container::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 15px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff5f56;
  box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27ca3f;
  z-index: 2;
}

.config-image {
  width: 100%;
  height: auto;
  display: block;
  margin-top: 30px;
  border-radius: 0 0 8px 8px;
}

.config-description {
  color: #c9d1d9;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
}

.highlight-box {
  background: rgba(139, 233, 253, 0.1);
  border: 1px solid rgba(139, 233, 253, 0.3);
  border-radius: 8px;
  padding: 1rem;
  max-width: 500px;
  text-align: center;
}

.highlight-text {
  color: #8be9fd;
  font-weight: 500;
  font-size: 1.1rem;
  margin: 0;
}
</style>

<h1 class="slide-title">My Claude Code Configuration with tmux</h1>

<div class="config-image-container">
  <img src="/ccdev@2x.png" alt="Claude Code Configuration" class="config-image">
</div>

---
layout: default
---

<style>
.slidev-layout {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%);
  padding: 2rem;
}

.slidev-layout h1 {
  font-size: 2.8rem;
  font-weight: 600;
  background: linear-gradient(135deg, #58a6ff 0%, #8be9fd 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.section {
  background: rgba(13, 17, 23, 0.6);
  border: 1px solid rgba(139, 233, 253, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.3rem;
  color: #8be9fd;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-text {
  color: #c9d1d9;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.file-example {
  font-family: 'Monaco', 'Cascadia Code', monospace;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 1rem;
  color: #c9d1d9;
  font-size: 0.9rem;
  line-height: 1.4;
}

.highlight-text {
  background: rgba(88, 166, 255, 0.1);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: 8px;
  padding: 1rem;
  color: #58a6ff;
  font-weight: 500;
  text-align: center;
  font-size: 1rem;
}
</style>

# What are Dotfiles?

<div class="content-grid">
  <div class="section">
    <div class="section-title">📁 Definition</div>
    <p class="section-text">
      Dotfiles are <strong>hidden configuration files</strong> that start with a dot (.) and control how your applications and system behave.
    </p>
    <p class="section-text">
      They're the <strong>DNA of your development environment</strong> - defining everything from shell aliases to editor settings to terminal themes.
    </p>
  </div>
  
  <div class="section">
    <div class="section-title">⚙️ Common Examples</div>
    <div class="file-example">
~/<br />
├── .bashrc          # Shell configuration<br />
├── .vimrc           # Vim editor settings<br />
├── .gitconfig       # Git preferences<br />
├── .tmux.conf       # Terminal multiplexer<br />
├── .zshrc           # Zsh shell config<br />
└── .claude/         # AI assistant config
    </div>
  </div>
</div>

<div class="highlight-text">
  💡 Hidden by default, but they control everything you see and use in your terminal!
</div>

---
layout: default
---

<style>
.slidev-layout {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%);
  padding: 1.5rem;
}

.slidev-layout h1 {
  font-size: 1.8rem;
  font-weight: 600;
  background: linear-gradient(135deg, #58a6ff 0%, #8be9fd 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 1rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.benefit-item {
  background: rgba(13, 17, 23, 0.6);
  border: 1px solid rgba(139, 233, 253, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  color: #c9d1d9;
}

.benefit-title {
  font-size: 0.9rem;
  color: #8be9fd;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.benefit-text {
  font-size: 0.8rem;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.benefit-code {
  font-family: 'Monaco', 'Cascadia Code', monospace;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #9ecf66;
}

.workflow-box {
  background: rgba(13, 17, 23, 0.6);
  border: 3px solid rgba(255, 184, 108, 0.5);
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.workflow-title {
  color: #ffb86c;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.workflow-text {
  font-family: 'Monaco', 'Cascadia Code', monospace;
  color: #c9d1d9;
  font-size: 0.8rem;
  line-height: 1.3;
}
</style>

# Why Git + Dotfiles = Perfect Match

<div class="benefits-grid">
  <div class="benefit-item">
    <div class="benefit-title">🔄 Version Control</div>
    <p class="benefit-text">Track every change, experiment safely, and rollback when needed.</p>
    <div class="benefit-code">git log --oneline</div>
  </div>
  
  <div class="benefit-item">
    <div class="benefit-title">🌍 Cross-Machine Sync</div>
    <p class="benefit-text">Same environment everywhere. One command gets your entire setup.</p>
    <div class="benefit-code">git clone dotfiles.git</div>
  </div>
  
  <div class="benefit-item">
    <div class="benefit-title">👥 Team Collaboration</div>
    <p class="benefit-text">Share configurations with teammates. Standardize environments.</p>
    <div class="benefit-code">git fork team-dotfiles</div>
  </div>
  
  <div class="benefit-item">
    <div class="benefit-title">💾 Bulletproof Backup</div>
    <p class="benefit-text">Your perfect setup is always safe in the cloud.</p>
    <div class="benefit-code">git push origin main</div>
  </div>
</div>

<div class="workflow-box">
  <div class="workflow-title">🚀 The Magic Workflow</div>
  <div class="workflow-text">
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/memorysaver/dotfiles/main/install.sh)"<br />
    → Perfect dev environment in 60 seconds
  </div>
</div>

---
layout: default
---

<style>
.slidev-layout {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%);
  padding: 1.5rem;
  color: #c9d1d9;
  font-size: 0.9rem;
}

.slidev-layout h1 {
  font-size: 2.2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #58a6ff 0%, #8be9fd 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 1.5rem;
}

.slidev-layout h2 {
  color: #8be9fd;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.slidev-layout pre {
  background: #ffffff;
  border: 1px solid rgba(139, 233, 253, 0.3);
  border-radius: 8px;
  padding: 0.8rem;
  color: #24292e;
  font-family: 'Monaco', 'Cascadia Code', monospace;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.4;
}

.slidev-layout code {
  background: #ffffff;
  color: #24292e;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  border: 1px solid rgba(139, 233, 253, 0.2);
  font-family: 'Monaco', 'Cascadia Code', monospace;
}

.slidev-layout strong {
  color: #58a6ff;
}

.slidev-layout ul li {
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.repo-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(139, 233, 253, 0.2);
  color: #8be9fd;
  font-weight: 500;
  font-size: 0.9rem;
}
</style>

# My Dotfiles Repository Overview

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">

<div>

## 📁 Repository Structure
```
memorysaver/dotfiles/
├── claude/
├── litellm/
├── nvim/
├── git/
├── lazygit/
├── gemini-cli/
├── openai-codex/
├── scripts/
├── .zshrc
├── .tmux.conf
└── install.sh
```

</div>

<div>

## 🔗 Symlink Design in install.sh
```bash
# Link Claude Code settings to ~/.claude
ln -sf "$DOTFILES/claude" "$HOME/.claude"
```

## 🚀 AI-Powered Development Focus
- **🤖 Claude Integration**: Dedicated configuration directory
- **🔗 LiteLLM Proxy**: Multi-AI provider routing  
- **⚡ Smart Install**: Automated symlink setup
- **🎯 AI Toolchain**: Comprehensive assistant configurations

</div>

</div>

<div class="repo-footer">
**🏠 Repository**: github.com/memorysaver/dotfiles | **🎯 Focus**: AI-powered development environment
</div>

---