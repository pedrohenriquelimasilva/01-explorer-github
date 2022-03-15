import { RepositoryItems } from "./RepositoryItems"
import { useState, useEffect } from "react"
import '../styles/repositoryList.scss'


//https://api.github.com/users/pedrohenriquelimasilva/repos
interface Repository { //necessario passar a tipagem inteira
  name: string,
  description: string,
  html_url: string
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]) //setar sempre um valor proximo. Esse operacional do TSC é uma forma generica passivel de ser alterado os valores


  useEffect(() => { //ele sempre vai ser executado quando tiver uma mudança na variavel passada como segundo parametro da função. Ele é executado apenas uma vez dessa forma. Tendo seu uso bem forte com promessas
    fetch('https://api.github.com/users/pedrohenriquelimasilva/repos') //chamada pra API
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, [])

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        {repositories.map(repository => <RepositoryItems key={repository.name} repository={repository} />)}

      </ul>
    </section>
  )
}