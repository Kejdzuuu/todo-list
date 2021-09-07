import React, { CSSProperties } from 'react';
import { TodoItem } from '../types';
import Item from './Item';
import NewItemForm from './NewItemForm';
import ListFilter from './ListFilter';
import { v4 as uuidv4 } from 'uuid';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_TODO_ITEMS } from '../queries';
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from '../mutations';

const useStyles = makeStyles(() => ({
  box: {
    height: "80vh",
    marginTop: "20px"
  }
}));

const sortByDone = (a: TodoItem, b: TodoItem): number => {
  if (a.done === b.done) {
    return 0;
  } else {
    return a.done ? 1 : -1;
  }
}

const generateGarbage = (): TodoItem[] => {
  const itemList: TodoItem[] = [];
  for(let i = 0; i < 3000; i++) {
    itemList.push({
      id: String(i),
      content: String(i),
      done:false
    })
  }
  return itemList;
}

const TodoList = () => {
  const [todoList, setTodoList] = React.useState<TodoItem[]>([]);
  const [generatedList, setGeneratedList] = React.useState<TodoItem[]>(generateGarbage());
  const [displayedList, setDisplayedList] = React.useState<TodoItem[]>(todoList);
  const [filter, setFilter] = React.useState<string>("all");
  const itemsQuery = useQuery(ALL_TODO_ITEMS);
  const [addItem] = useMutation(ADD_ITEM);
  const [removeItem] = useMutation(REMOVE_ITEM);
  const [updateItem] = useMutation(UPDATE_ITEM);
  const classes = useStyles();

  useEffect(() => {
    if (itemsQuery.data) {
      setTodoList(itemsQuery.data.allItems);
    }
  }, [itemsQuery.data])

  useEffect(() => {
    if (filter === "stress") {
      setDisplayedList(generatedList);
    } else {
      setDisplayedList(todoList.filter(filterItems).sort(sortByDone));
    }
  }, [filter, todoList, generatedList]);

  const filterItems = (item: TodoItem): boolean => {
    if (filter === "done") {
      return item.done;
    } else if (filter === "not done") {
      return !item.done;
    } else {
      return true;
    }
  }

  const toggleItemDone = (id: string) => {
    if (filter === "stress") {
      const newList: TodoItem[] = generatedList.map((item: TodoItem) => {
        if (item.id === id) {
          return ({...item, done: !item.done});
        } else {
          return item;
        }
      })
      setGeneratedList(newList);
    } else {
      updateItem({ variables: {id} });
      const newList: TodoItem[] = todoList.map((item: TodoItem) => {
        if (item.id === id) {
          return ({...item, done: !item.done});
        } else {
          return item;
        }
      }).sort(sortByDone);
      setTodoList(newList);
      console.log(newList.filter((item) => item.done));
    }
  }

  const addNewItem = (content: string) => {
    if (filter === "stress") {
      const newItem: TodoItem = {
        id: String(uuidv4()),
        content: content,
        done: false
      }
      const newList: TodoItem[] = [newItem, ...generatedList];
      setGeneratedList(newList);
    } else {
      addItem({ variables: {content} }).then(({data}) => {
        const newItem = {
          id: data.addItem.id,
          content: data.addItem.content,
          done: false,
        }
        const newList: TodoItem[] = [newItem, ...todoList];
        setTodoList(newList);
      });
    }
  }

  const deleteItem = (id: string) => {
    if (filter === "stress") {
      const newList: TodoItem[] = generatedList.filter((item: TodoItem) => 
        item.id !== id
      );
      setGeneratedList(newList);
    } else {
      removeItem({ variables: {id} });
      const newList: TodoItem[] = todoList.filter((item: TodoItem) => 
        item.id !== id
      );
      setTodoList(newList);
    }
    const newList: TodoItem[] = todoList.filter((item: TodoItem) => 
      item.id !== id
    );
    setTodoList(newList);
  }

  interface RenderItemProps {
    index: number,
    style: CSSProperties,
    toggleItemDone: (id: string) => void,
    deleteItem: (id: string) => void
  }

  const RenderItem = ({index, style, toggleItemDone, deleteItem}: RenderItemProps) => {
    return (
      <Item item={displayedList[index]} toggleItemDone={toggleItemDone} deleteItem={deleteItem} style={style}/>
    )
  }

  return (
    <div>
      <NewItemForm addItem={addNewItem} />
      <ListFilter filter={filter} setFilter={setFilter} />
      <div className={classes.box}>
        <AutoSizer>
          {({ height, width}) => (
            <FixedSizeList
              height={height}
              width={width}
              itemData={displayedList}
              itemCount={displayedList.length}
              itemSize={50}
            >
              {(props) => RenderItem({...props, toggleItemDone, deleteItem})}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default TodoList;
