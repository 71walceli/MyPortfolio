import { ReactNode, createContext, useEffect, useState } from "react";

interface ReadyProps {
  ready?: boolean;
  setReady?: (value: boolean) => void;
}
export const ReadyContext = createContext<ReadyProps>({  })
export const  ReadyProvider = ({children}: {children: ReactNode}) => {
  const [ready, setReady] = useState(false)
  useEffect(() => console.log({ ready, setReady, }), [ready])

  return <ReadyContext.Provider value={{ ready, setReady, }}>
    {children}
  </ReadyContext.Provider>
}


