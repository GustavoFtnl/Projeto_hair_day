import { hoursLoad } from "../form/hoursLoad.js";
import { scheduleByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "./show.js";

const selectedDate = document.getElementById("date");
export async function schedulesDay() {
  const date = selectedDate.value;

  const dailySchedules = await scheduleByDay({ date });

  schedulesShow({ dailySchedules });

  //nessa funcao estaremos carregando os horarios disponiveis no dia, de acordo com o horario do dia
  hoursLoad({ date, dailySchedules });
}
