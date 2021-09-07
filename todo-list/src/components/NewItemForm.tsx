import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    position: 'relative',
    top: '10px'
  },
  grid: {
    marginBottom: '10px'
  }
}));

const NewItemForm = ({
  addItem
}: {
  addItem: (content: string) => void;
}
) => {
  const [content, setContent] = useState('');
  const classes = useStyles();

  const handleAddItem = () => {
    addItem(content);
    setContent('');
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }

  return (
    <Grid container spacing={3} className={classes.grid}>
      <Grid item xs>
        <TextField value={content} label="New item" onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleAddItem} className={classes.button}>Add</Button>
      </Grid>
    </Grid>
  )
}

export default NewItemForm;
