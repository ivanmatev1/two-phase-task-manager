import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const { isAuthenticated, token } = useContext(AuthContext);

  const baseURL = 'http://localhost:3001';

  const getTasks = () => {
    axios.get(`${baseURL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log('API Response:', response.data);
      setTasks(response.data);
    })
    .catch(error => {
      console.error('API Request Error:', error.message);
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      getTasks();
    }
  }, [isAuthenticated]);

  const postTask = () => {
    if (task !== "") {
      axios.post(`${baseURL}/tasks`, { task }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log('API Response:', response.data);
        getTasks();
        setTask("");
      })
      .catch(error => {
        console.error('API Request Error:', error.message);
      });
    }
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={postTask}>Add Task</button>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
