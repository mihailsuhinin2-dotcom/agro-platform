import { useEffect, useState } from 'react';

function App() {
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState({});

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/forum/topics')
      .then(res => res.json())
      .then(data => setTopics(data));
  }, []);

  const createTopic = async () => {
    const res = await fetch('http://localhost:3000/forum/topic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    const newTopic = await res.json();
    setTopics([...topics, newTopic]);
  };

  const loadComments = async (topicId) => {
    const res = await fetch(`http://localhost:3000/comment/${topicId}`);
    const data = await res.json();

    setComments(prev => ({
      ...prev,
      [topicId]: data,
    }));
  };

  const addComment = async (topicId) => {
    const text = commentText[topicId];

    const res = await fetch('http://localhost:3000/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, text }),
    });

    const newComment = await res.json();

    setComments(prev => ({
      ...prev,
      [topicId]: [...(prev[topicId] || []), newComment],
    }));

    setCommentText(prev => ({
      ...prev,
      [topicId]: '',
    }));
  };

  const askAI = async () => {
    const res = await fetch('http://localhost:3000/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1>🌾 Аграрная цифровая платформа</h1>
        <p className="text-muted">
          Форум • AI помощник • Сообщество фермеров
        </p>
      </div>

      {/* AI BLOCK */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4>🤖 AI помощник</h4>

          <input
            className="form-control my-2"
            placeholder="Задай вопрос..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button className="btn btn-primary" onClick={askAI}>
            Спросить AI
          </button>

          {answer && (
            <div className="alert alert-info mt-3">
              {answer}
            </div>
          )}
        </div>
      </div>

      {/* CREATE TOPIC */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4>💬 Создать тему</h4>

          <input
            className="form-control my-2"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control my-2"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="btn btn-success" onClick={createTopic}>
            Создать тему
          </button>
        </div>
      </div>

      {/* TOPICS */}
      <h3 className="mb-3">📌 Форум</h3>

      {topics.map((t) => (
        <div key={t.id} className="card mb-3 shadow-sm">
          <div className="card-body">

            <h5>{t.title}</h5>
            <p>{t.description}</p>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => loadComments(t.id)}
            >
              Показать комментарии
            </button>

            <div className="mt-3">

              {(comments[t.id] || []).map((c) => (
                <div key={c.id} className="alert alert-secondary py-1">
                  💬 {c.text}
                </div>
              ))}

              <div className="d-flex gap-2 mt-2">
                <input
                  className="form-control"
                  placeholder="Комментарий"
                  value={commentText[t.id] || ''}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [t.id]: e.target.value,
                    })
                  }
                />

                <button
                  className="btn btn-outline-success"
                  onClick={() => addComment(t.id)}
                >
                  ➕
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default App;