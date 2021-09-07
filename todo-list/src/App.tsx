import React from 'react';
import TodoList from './components/TodoList';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" align="center">Your todo list</Typography>
      <TodoList />
    </Container>
  );
}

export default App;
