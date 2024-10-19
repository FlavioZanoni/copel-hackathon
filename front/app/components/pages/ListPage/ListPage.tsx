import { DefType, Pagination } from "@api/types"
import { SecondaryHeader } from "@components/SecondaryHeader"
import { SearchBar } from "@folhastech/design-system/SearchBar"
import React, { useState } from "react"
import "react-loading-skeleton/dist/skeleton.css"
import { PaginatedList } from "../../Lists/PaginatedList"

export interface OnClickProps {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
  id: number
}

type ApiFunction<T> = (params?: any) => Promise<Pagination<T>>

type PageListProps<T> = {
  form?: ({
    id,
    setOpenDrawer,
  }: {
    id: number | undefined
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  }) => JSX.Element
  filterForm?: JSX.Element
  title: string
  subtitle?: string
  label: string
  apiFunction: ApiFunction<T>
  currentId: number | undefined
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>
  onClick?: ({ e, id }: OnClickProps) => void
  search?: boolean
  instances: string[]
  apiParams?: {
    key: string
    value: string
  }[]
  children?: React.ReactNode
  dividerLabel?: string[]
  path?: string
  isDefaultList?: boolean
}

/**
 * @description pagina de listagem generica com searchbar infinite query
 *
 * @param {JSX.Element} [form] formulario para ser renderizado no drawer
 * @param {JSX.Element} [filterForm] formulario para ser renderizado no drawer
 * @param {string} [title] titulo da pagina
 * @param {string} [subtitle] subtitulo da pagina 
 * @param {boolean} [isDefaultList] se a lista é a lista padrão ou uma table
 * @param {string} [label] label para ser renderizado no drawer ja inclui o editar e novo
 * @param {ApiFunction<T>} [apiFunction] funcao que retorna a lista de itens
 * @param {number | undefined} [currentId] id do item selecionado
 * @param {React.Dispatch<React.SetStateAction<number | undefined>>} [setCurrentId] funcao para setar o id do item selecionado
 * @param {({ e, id }: OnClickProps) => void} [onClick] funcao para ser executada ao clicar em um item da lista
 * @param {boolean} [search] se deve ou nao renderizar a barra de pesquisa
 * @param {string[]} [instances] name da instancia para ser usado no drawer, controla a quantidade de listas
 * @param {{key: string, value: string}[]} [apiParams] chavese valores para serem colocadas junto a chamada da api, serao passadas na ordem da instancia, devem ter o mesmo tamanho da instancia
 * @param {React.ReactNode} [children] children para serem renderizados dentro da lista, troca a renderizaçao padrao para o componente passado exemplo no /applications/page.tsx
 * @param {string[]} [dividerLabel] label para serem renderizados como divisor de lista, deve ter o mesmo tamanho da instancia
 * @param {string} [path] path que sera usado para trocar de pagina com o next/link
 *
 * @example <caption>Exemplo de uso econtrado em /page.tsx</caption>
 *
 * <List
              instances={["Plot"]}
              apiFunction={getPlot}
              title="Talhões"
              subtitle="Listagem de todos os seus talhões"
              label={"Talhão"}
              currentId={currentId}
              setCurrentId={setCurrentId}
              search
              path={`/plot`}
              />
 */

function ListPage<T extends DefType>({
  form,
  filterForm,
  title,
  subtitle,
  label,
  apiFunction,
  currentId,
  setCurrentId,
  onClick,
  search,
  instances,
  apiParams,
  children,
  dividerLabel,
  path,
  isDefaultList = true
}: PageListProps<T>) {
  const [query, setQuery] = useState("")
  const [filterValues, setFilterValues] = useState({})
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <div
        className={
          "flex h-[calc(100dvh-86px-88px)] flex-col gap-6 overflow-y-scroll bg-white p-6 lg:px-8"
        }
      >
        <SecondaryHeader title={title} subtitle={subtitle} />
        <div className="flex w-full flex-row">
          {search && <SearchBar setQuery={setQuery}
            filterDrawer={filterForm ? {
              title: "Filtros",
              description: "Filtre os itens da lista",
              form: filterForm,
              setFilterValues: setFilterValues,
              open: isFormOpen,
              setOpen: setIsFormOpen
            } : undefined}
          />}
        </div>

        {instances.map((instance, index) => (
          <div key={index} className="flex flex-col gap-6 bg-white">
            {dividerLabel?.[index] && (
              <h3
                className="sticky top-[-24px] flex flex-col bg-white pb-2 text-primary-0"
              // 24 is the top padding present in the page
              >
                {dividerLabel[index]}
              </h3>
            )}

            {isDefaultList ? (<PaginatedList<T>
              form={form}
              title={title}
              label={label}
              apiFunction={apiFunction}
              param={apiParams?.[index]}
              currentId={currentId}
              setCurrentId={setCurrentId}
              onClick={onClick}
              instance={instance}
              query={query}
              filterValues={filterValues}
              path={path}
            >
              {children}
            </PaginatedList>

            ) : (children)}
          </div>
        ))}
      </div>
    </>
  )
}

export { ListPage }
