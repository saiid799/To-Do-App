"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import { FaPenNib } from "react-icons/fa";
import { BsFillXOctagonFill } from "react-icons/bs";

export default function Component() {
  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);
  const [filter, setFilter] = useState("all");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = () => {
    if (newTodoText.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodoText, completed: false },
      ]);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  const startEditingTodo = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const filteredTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <h1 className="text-3xl font-bold mb-4 text-[#373738] flex justify-center py-2">
        Asr To Do App
      </h1>
      <div className="w-full max-w-md p-4 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-[#373738] flex justify-center">
          Todo App
        </h1>
        <div className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Add a new todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            className="flex-1 text-[#373738] mr-2 bg-muted placeholder-text-[#373738] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={addTodo}>Add</Button>
        </div>
        <motion.div
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {filteredTodos().map((todo) => (
            <motion.div
              key={todo.id}
              className="flex items-center justify-between bg-muted rounded-md px-3 py-2"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-center">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="mr-2"
                />
                {editingTodoId === todo.id ? (
                  <Input
                    type="text"
                    value={editingTodoText}
                    onChange={(e) => setEditingTodoText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        editTodo(todo.id, editingTodoText);
                      }
                    }}
                    className="flex-1 bg-muted text-[#373738] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-[#373738] ${
                      todo.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {todo.text}
                  </label>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingTodoId === todo.id ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => editTodo(todo.id, editingTodoText)}
                      className="text-[#373738] hover:text-primary-foreground"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingTodoId(null);
                        setEditingTodoText("");
                      }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <BsFillXOctagonFill className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditingTodo(todo.id, todo.text)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <FaPenNib className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-between items-center mt-4 text-muted-foreground">
          <div>{todos.filter((todo) => !todo.completed).length} items left</div>
          <div className="flex items-center space-x-2">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
