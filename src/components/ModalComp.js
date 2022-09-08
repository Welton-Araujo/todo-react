import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../services/api";


const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [task, setName] = useState(dataEdit.task || "");
  const [done, setDone] = useState(dataEdit.done || "1");
  const [id] = useState(dataEdit.id);

  const handleSave = () => {
    if (!task || !done) return;

    if (taskAlreadyExists()) {
      return alert("Tarefa já cadastrado!");
    }

    if (Object.keys(dataEdit).length) {
      console.log("fsadfsadf")
      data[dataEdit.index] = { task, done };
    console.log("id: ", id)
    api
    .patch("http://192.168.0.112:8080/api/todos/"+id+"/done",{
      task: task,
      done: done
    })
    .then((response) => {
      const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { task, done }]
      : [...(data ? data : [])];

      setData(newDataArray);
      console.log("response.data: ", response.data)
    })  
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
    }else{
      api
    .post("http://192.168.0.112:8080/api/todos",{
      task: task,
      done: done
    })
    .then((response) => {
      const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { task, done }]
      : [...(data ? data : [])];

      setData(newDataArray);
      console.log("response.data: ", response.data)
    })  
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
    }
    console.log(data)
    console.log(task)
    console.log(done)
    

    

    //localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

    onClose();
  };

  const taskAlreadyExists = () => {
    if (dataEdit.task !== task && data?.length) {
      return data.find((item) => item.task === task);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Tarefas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Tarefa</FormLabel>
                <Input
                  type="text"
                  value={task}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Status</FormLabel>
                <RadioGroup onChange={setDone} value={done}>
                  <Stack direction='row'>
                    <Radio value='Pendente'>Pendente</Radio>
                    <Radio value='Concluida'>Concluida</Radio>
                    <Radio value='Deletada'>Deletada</Radio>
                  </Stack>
                </RadioGroup>
                {/* <Input
                    type="email"
                    value={email}
                    onChange={(e) => setDone(e.target.value)}
                  /> */}
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;