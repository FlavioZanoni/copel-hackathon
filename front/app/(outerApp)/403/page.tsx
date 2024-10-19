import Link from "next/link"

const ForbiddenPage = () => {
  return (
    <div className="m-auto flex h-full flex-col items-center justify-center gap-2 text-primary-0">
      <h1 className="text-3xl font-bold ">403</h1>
      <p>Nao autorizado</p>

      <Link className="text-primary-20" href={"/"}>
        Voltar para a pagina inicial
      </Link>
    </div>
  )
}

export default ForbiddenPage
