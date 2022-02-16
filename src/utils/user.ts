// import { useEffect } from "react";
// import { User } from "types/user";
// import { cleanObject } from "utils";
// import { useHttp } from "./http"
// import { useAsync } from "./use-async";

// export const useUsers=(param?:Partial<User>)=>{
//     const client=useHttp();
//     const {run,...result}=useAsync<User[]>();
//     useEffect(() => {
//         run(client('users', { data: cleanObject(param||{}) }))

//     }, [param])

//     return result
// }

import { useHttp } from "utils/http";
import { User } from "types/user";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
