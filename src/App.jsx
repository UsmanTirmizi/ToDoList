import { useEffect, useState } from "react"
import classes from './styles.module.css'
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";

function App() {
  const [loading,setLoading]=useState(false);
  const [todoList,setTodoList]=useState([]);
  const [errorMsg,setErrorMsg]=useState(null);
  const [todoDetails,setTodoDetails]=useState(null);
  const [openDialog,setOpenDialog]=useState(false);

  async function fetchTodoList() {
    try {
      setLoading(true);
      const apiResponse= await fetch('https://dummyjson.com/todos');
      const result=await apiResponse.json();

   
    
      if(result?.todos && result?.todos?.length >0 )
      {
        setTodoList(result.todos);
        setLoading(false);
        setErrorMsg('');
      }else{
        setTodoList([])
        setLoading(false);
        setErrorMsg("Could not fetch!")
      }

    } catch (error) {
      console.log(error);
      setErrorMsg("Some Error Occured!")
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
 

   try {
    const apiResponse= await fetch(`https://dummyjson.com/todos/${getCurrentTodoId}`);
    const result=await apiResponse.json();

    if(result){
      setTodoDetails(result);
      setOpenDialog(true);
    }else{
      setTodoDetails(null);
      setOpenDialog(false);
    }
    
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(()=>{
    fetchTodoList();
  },[])

  if(loading) return <Skeleton variant="rectangular" width={650} height={650}/>
  return (
   <div className={classes.mainWrapper}>
    <h1 className={classes.headerTitle}>Simple TODO App using material UI</h1>
    <div className={classes.todoListWrapper}>
      {
        todoList && todoList.length >0 ?
        todoList.map((todoItem)=> <TodoItem 
        fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
        todo={todoItem}/>) :null
      }
    </div>
    <TodoDetails setTodoDetails={setTodoDetails} setOpenDialog={setOpenDialog} openDialog={openDialog} todoDetails={todoDetails}/>
   </div>
  )
} 

export default App
