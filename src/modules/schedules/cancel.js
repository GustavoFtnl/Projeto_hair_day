const periods = document.querySelectorAll(".period");
import { scheduleCancel } from "../../services/schedule-cancel.js";
import { schedulesDay } from "./load.js";

periods.forEach((period) => {
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      //captura o elemento li pai do icone de cancelar
      const item = event.target.closest("li");
      const { id } = item.dataset;

      //confirma se quer cancelar o agendamento
      if (id) {
        const isConfirm = confirm(
          "Tem certeza que deseja cancelar o agendamento?"
        );
        if (isConfirm) {
          await scheduleCancel({ id });
          schedulesDay();
        }
      }
    }
  });
});
