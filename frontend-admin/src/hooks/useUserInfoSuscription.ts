import { userSelectedService } from "@/services/sharing.service";
import { UserInfo } from "@/types";
import { useState } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
function useUserInfoSuscription() {
    const suscription = userSelectedService.getSubject()
    const [userInfo, setUserInfo] = useState<UserInfo>({ id: "", departmentId: "", password: "", roleId: "", username: "" })
    useIsomorphicLayoutEffect(() => {
        suscription.subscribe((data) => {
            setUserInfo(data)
        })
    }, [suscription])
    return { userInfo }
}

export default useUserInfoSuscription;