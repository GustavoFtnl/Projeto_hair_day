import { apiConfig } from "./api-config";
import dayjs from "dayjs";

export async function scheduleByDay({ date }) {
  try {
    //faz a requisicao GET na API para receber todos os dados
    const response = await fetch(`${apiConfig.baseURL}/schedules`);

    //transforma a resposta em JSON para ser manipulada
    const data = await response.json();

    //filtra a resposta para aparecer apenas os agendamentos do dia
    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day")
    );

    //retorna apenas os agendamentos daquele dia
    return dailySchedules;
    
  } catch (error) {
    console.log(error);
    alert("Nao foi possivel exibir os agendamentos do dia.");
  }
}
