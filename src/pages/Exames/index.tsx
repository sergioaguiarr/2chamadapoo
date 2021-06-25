import React, { useState } from 'react'
import { useEffect } from 'react'
import api from '../../services/api'

import { ExamesEstilo } from './styles'

interface Exames {
  id: string;
  nome: string;
  tipoexame: string;
  nomeexame: string;
  mesanoexame: string;
  laboratorio: string;
}

const Exames: React.FC = () => {
  const [ exames, setExames ] = useState<Exames[]>([])

  const [admissional, setAdmissional] = useState<number>(0)
  const [periodico, setPeriodico] = useState<number>(0)
  const [demissional, setDemissional] = useState<number>(0)
  const [hemograma, setHemograma] = useState<number>(0)
  const [audiometria, setAudiometria] = useState<number>(0)
  const [acuidade, setAcuidade] = useState<number>(0)
  const [funcional, setFuncional] = useState<number>(0)
  const [medicina, setMedicina] = useState<number>(0)

  useEffect(() => {
    buscarTodosExames()
  }, [])

  function calcularTotais(examesData: Exames[]) {
    examesData.forEach(async exame => {
      switch(exame.tipoexame) {
        case 'admissional':
          setAdmissional(admissional + 1)
          break;
        case 'periodico':
          setPeriodico(periodico + 1)
          break;
        case 'demissional':
          setDemissional(demissional + 1)
          break;
      }

      switch(exame.nomeexame) {
        case 'hemograma completo':
          setHemograma(hemograma + 1)
          break;
        case 'audiometria':
          setAudiometria(audiometria + 1)
          break;
        case 'acuidade visual':
          setAcuidade(acuidade + 1)
          break;
      }

      switch(exame.laboratorio) {
        case 'lab funcional':
          setFuncional(funcional + 1)
          break;
        case 'lab medicina':
          setMedicina(medicina + 1)
          break;
      }
    })
  }


  async function buscarTodosExames() {
    const todosExames = await api.get('/exames')
    console.log(todosExames.data)
    setExames(todosExames.data)
    calcularTotais(todosExames.data)
  }

  async function cadastrarExame(event: any) {
    event.preventDefault()
    const { target: form } = event

    const { nome, tipoexame, nomeexame, mesanoexame, laboratorio } = form

    await api.post('/exames', {
      nome: nome.value.toLowerCase(),
      tipoexame: tipoexame.value.toLowerCase(),
      nomeexame: nomeexame.value.toLowerCase(),
      mesanoexame: mesanoexame.value.toLowerCase(),
      laboratorio: laboratorio.value.toLowerCase()
    }).then(response => {
      setExames([...exames, response.data])
    }).catch(error => {
      alert('Erro ao cadastrar um novo exame')
      console.log(error)
    })

    form.reset()

  }

  async function deletarExame(id:string) {
    await api.delete(`/exames/${id}`)
    buscarTodosExames()
  }


  return (
    <ExamesEstilo>
      <form onSubmit={cadastrarExame}>
        <div>
          <p>Nome</p>
          <input
            type='text'
            name='nome'
          />
        </div>
        <div>
          <p>Tipo</p>
          <input
            type='text'
            name='tipoexame'
          />
        </div>
        <div>
          <p>Nome do exame</p>
          <input
            type='text'
            name='nomeexame'
          />
        </div>
        <div>
          <p>Mês e ano</p>
          <input
            type='text'
            name='mesanoexame'
          />
        </div>
        <div>
        <p>Laboratório</p>
          <input
            type='text'
            name='laboratorio'
          />
        </div>
        <button type="submit">Salvar</button>
      </form>

      <main>
        <h1>Relatórios</h1>
        <h2>Todos exames</h2>
        <header>
          <p>Nome</p>
          <p>Tipo do exame</p>
          <p>Nome do exame</p>
          <p>Mês e ano</p>
          <p>Laboratórios</p>
        </header>
        {
          exames && exames.map(exame => {
            return (
              <section key={exame.id}>
                <p>{exame.nome}</p>
                <p>{exame.tipoexame}</p>
                <p>{exame.nomeexame}</p>
                <p>{exame.mesanoexame}</p>
                <p>{exame.laboratorio}</p>
                <button type="button" onClick={() => deletarExame(exame.id)}>
                  Deletar
                </button>
              </section>
            );
          })
        }

        <div>
          <h3>Total exames do laboratório</h3>
          <p>Lab Funcional: {funcional}</p>
          <p>Lab Medicina: {medicina}</p>
        </div>

        <div>
          <h3>Total de Tipos de Exame</h3>
          <p>Admissão: {admissional}</p>
          <p>Periódico: {periodico}</p>
          <p>Demissional: {demissional}</p>
        </div>

        <div>
          <h3>Total do nome de exame</h3>
          <p>Hemograma Completo: {hemograma}</p>
          <p>Audiometria: {audiometria}</p>
          <p>Acuidade Visual: {acuidade}</p>
        </div>

      </main>
    </ExamesEstilo>
  )
}

export default Exames
