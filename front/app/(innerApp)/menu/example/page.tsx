"use client"
import { Example, getExample } from "@api/example"
import { ExampleForm } from "@components/Forms/ExampleForm"
import { ListPage } from "@components/pages/ListPage"
import { useState } from "react"

const Examples = () => {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  return (
    <ListPage<Example>
      instances={["Admin"]}
      apiFunction={getExample}
      title={"Example"}
      subtitle={"Lista de Examples cadastrados"}
      label={"Example"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={ExampleForm}
      apiParams={[
        { key: "role", value: "Admin" },
      ]}
      dividerLabel={["Admin"]}
      search
    />
  )
}

export default Examples
