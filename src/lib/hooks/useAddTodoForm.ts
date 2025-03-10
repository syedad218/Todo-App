import { useState, useEffect } from "react";
import { useTodoMutations } from "./useTodoMutations";
import { useUrlParams } from "./useUrlParams";

export const useAddTodoForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { page, search } = useUrlParams();

  const shouldUseOptimisticUpdate = page === 1 && search === "";

  const { addTodoMutation } = useTodoMutations(
    "",
    1,
    shouldUseOptimisticUpdate
  );

  const { error, isSuccess } = addTodoMutation;

  useEffect(() => {
    if (isSuccess) {
      setInputValue("");
    }
  }, [isSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) addTodoMutation.reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodoMutation.mutate(inputValue);
    }
  };

  return {
    inputValue,
    handleInputChange,
    handleSubmit,
    addTodoMutation,
  };
};
