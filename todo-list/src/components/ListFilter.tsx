import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

interface StyleProps {
  filter: string
}

const useStyles = makeStyles<StyleProps>(() => ({
  buttonGroup: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const ListFilter = ({
  filter,
  setFilter
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) => {
  const classes = useStyles(filter);

  return (
    <div className={classes.buttonGroup}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "done" ? "contained" : "outlined"} onClick={() => setFilter("done")}>Done</Button>
        <Button variant={filter === "not done" ? "contained" : "outlined"} onClick={() => setFilter("not done")}>Not done</Button>
        <Button variant={filter === "stress" ? "contained" : "outlined"} onClick={() => setFilter("stress")}>Stress test</Button>
      </ButtonGroup>
    </div>
  )
}

export default ListFilter;
