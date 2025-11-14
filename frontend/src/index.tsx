import { Suspense, lazy } from "react"

import { createRoot } from "react-dom/client"

const App = lazy(() => import("./app/index.tsx"))

createRoot(document.getElementById("root")!).render(
  <Suspense
    fallback={
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    }>
    <App />
  </Suspense>
)
