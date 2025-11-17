import { apiConfig } from "./api-config";

export async function scheduleNew({ id, name, when }) {
  try {
    //faz a requisição para a API para adicionar um novo agendamento
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id, name, when}),
    })

    //exxibe a mensagem de que o agendamento foi feito
    alert("Agendamento cadastrado com sucesso!")
  } catch (error) {
    console.log(error)
    alert("Nao foi possivel fazer o agendamento, tente novamente mais tarde!")
  }
}
