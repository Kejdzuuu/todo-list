import React, { CSSProperties } from 'react';
import { TodoItem } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  done: {
    backgroundColor: "#e8e8e8",
    textDecoration: "line-through",
  },
  not_done: {
    backgroundColor: theme.palette.background.paper,
  }
}));

const Item = ({
  item,
  style,
  toggleItemDone,
  deleteItem
}: {
  item: TodoItem;
  style: CSSProperties;
  toggleItemDone: (id: string) => void;
  deleteItem: (id: string) => void;
}) => {
  const classes = useStyles();

  return (
    <ListItem className={item.done ? classes.done : classes.not_done} style={style}>
      <Checkbox checked={item.done} color="default" onClick={() => toggleItemDone(item.id)} />
      <ListItemText primary={item.content} />
      <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default Item;
