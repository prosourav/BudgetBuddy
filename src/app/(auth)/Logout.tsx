// import { doLogout } from "@/app/actions"

import { doLogout } from "@/app/actions"


const Logout = () => {
  return (
    <form action={doLogout}>
      <button>Logout</button>
    </form>
  )
}

export default Logout