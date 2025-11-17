import { openingHours } from "../../utils/openingsHours.js";
import { hourClick } from "./hoursClick.js";
import dayjs from "dayjs";

//captura o elemento ul com as horas
const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  //limpa a lista de horarios antes de carrega-los para evitar duplicacoes
  hours.innerHTML = "";

  //verifica se a hora ja esta agendada
  const unavailableHours = dailySchedules.map((schedules) =>
    dayjs(schedules.when).format("HH:mm")
  );

  //percorre as horas daquele dia para verificar quais estao disponiveis
  const opening = openingHours.map((hour) => {
    //separa a string do horario para obter apenas o numero
    const [scheduleHour] = hour.split(":");

    //verifica se o horario esta no passado
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs());

    const available = !unavailableHours.includes(hour) && isHourPast;

    return {
      hour,
      available,
    };
  });

  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");
    //<li class="hour hour-available" data-period="morning" value="09:00">09:00</li>

    //adicionando as classes do elemento
    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");
    li.setAttribute("value", hour);
    li.textContent = hour;

    if (hour === "9:00") {
      addHourHeader("Manhã");
    } else if (hour === "13:00") {
      addHourHeader("Tarde");
    } else if (hour === "18:00") {
      addHourHeader("Noite");
    }

    hours.append(li);
  });

  hourClick();
}

function addHourHeader(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;

  hours.append(header);
}
