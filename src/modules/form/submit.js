import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new";
import { schedulesDay } from "../schedules/load";

//captura os elementos do formulario e do input de data
const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selectedDate = document.getElementById("date");

//seta a data atual
const todayDate = dayjs(new Date()).format("YYYY-MM-DD");

//preenche o input data com a data atual automaticamente e seta o valor minumo do input para evitar agendamentos no passado
selectedDate.value = todayDate;
selectedDate.min = todayDate;

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    //coletar os dados do cliente

    //coletar nome
    const name = clientName.value.trim();
    console.log(clientName.value.trim());

    if (!name) {
      return alert("Preencha o campo nome!");
    }

    //coleta o horario selecionado
    const selected = document.querySelector(".hour-selected");

    if (!selected) {
      return alert("Selecione um Horario");
    }

    const [selectedHour] = selected.textContent.split(":");
    //adiciona a hora do horario a data escolhida
    const when = dayjs(selectedDate.value).add(selectedHour, "hour");

    //gerando um id unico para cada agendamento
    const id = new Date().getTime();

    //chamando a funcao que sobe o agendamento para a API
    await scheduleNew({ id, name, when });

    //recarrega os agendamentos
    await schedulesDay();

    //limpa o input de nome
    clientName.value = "";
  } catch (error) {
    alert("Não foi possível fazer o agendamento.");
    console.log(error);
  }
};
