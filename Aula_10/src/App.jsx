import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Baixa");
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showConfirm, setShowConfirm] = useState(null); // stores the id of task to delete

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("@taskflow_data");
    if (saved) {
      try {
        setTaskList(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar dados", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
    }
  }, [taskList, isLoaded]);

  const addTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    setTaskList([newTask, ...taskList]);
    setTaskText("");
    setPriority("Baixa");
  };

  const toggleTask = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter(t => t.id !== id));
    setShowConfirm(null);
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, text: editText } : t
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const processedTasks = useMemo(() => {
    let result = taskList.filter(t => 
      t.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === "Pendentes") result = result.filter(t => !t.completed);
    if (filter === "Concluídas") result = result.filter(t => t.completed);

    const priorityWeights = { "Alta": 3, "Média": 2, "Baixa": 1 };
    
    return [...result].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; 
      }
      return priorityWeights[b.priority] - priorityWeights[a.priority];
    });
  }, [taskList, filter, searchTerm]);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-section">
          <div className="logo-icon">DEV</div>
          <h1>System</h1>
        </div>
        <p className="subtitle">Gestão de Produtividade</p>
      </header>

      <section className="form-section glass">
        <form onSubmit={addTask}>
          <div className="input-group">
            <input
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="O que precisa ser feito?"
              autoComplete="off"
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className={priority.toLowerCase()}>
              <option value="Baixa"> Baixa</option>
              <option value="Média"> Média</option>
              <option value="Alta"> Alta</option>
            </select>
            <button type="submit" className="btn-add">Criar Tarefa</button>
          </div>
        </form>
      </section>

      <section className="controls-section">
        <div className="search-bar glass">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input 
            type="text" 
            placeholder="Buscar tarefas..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-tabs">
          {["Todas", "Pendentes", "Concluídas"].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <main className="task-grid">
        {processedTasks.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma tarefa encontrada.</p>
          </div>
        ) : (
          processedTasks.map(item => (
            <div key={item.id} className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''} glass`}>
              <div className="task-header">
                <span className={`priority-badge ${item.priority.toLowerCase()}`}>{item.priority}</span>
                <small className="date">{item.createdAt}</small>
              </div>

              <div className="task-content">
                {editingId === item.id ? (
                  <div className="edit-mode">
                    <input 
                      value={editText} 
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(item.id)}
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button onClick={() => saveEdit(item.id)} className="btn-save">Salvar</button>
                      <button onClick={cancelEdit} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <h3 className={item.completed ? 'strikethrough' : ''}>{item.text}</h3>
                )}
              </div>

              <div className="task-actions">
                <div className="main-actions">
                  <button onClick={() => toggleTask(item.id)} className={`btn-status ${item.completed ? 'btn-reopen' : 'btn-complete'}`}>
                    {item.completed ? "Reabrir" : "Concluir"}
                  </button>
                  <button onClick={() => startEditing(item)} className="btn-edit" disabled={item.completed}>
                    Editar
                  </button>
                </div>
                  <button onClick={() => setShowConfirm(item.id)} className="btn-delete" title="Deletar tarefa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trash-icon">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
              </div>
            </div>
          ))
        )}
      </main>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <h2>Confirmar Remoção</h2>
            <p>Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.</p>
            <div className="modal-actions">
              <button onClick={() => deleteTask(showConfirm)} className="btn-confirm-delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path d="M3 6h18"/>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                </svg>
                Excluir
              </button>
              <button onClick={() => setShowConfirm(null)} className="btn-cancel-modal">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>Total: {processedTasks.length} tarefas</p>
      </footer>
    </div>
  );
}

export default App;
