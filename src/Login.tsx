import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,

} from "@/components/ui/card"
import { Label } from "./components/ui/label"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import Cookies from 'js-cookie'
import { FormEventHandler, useEffect, useState } from "react"
import { api, coookie_options } from "./config"

import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import { cn } from "./lib/utils"
import { useNavigate } from "react-router-dom"
import SelfIcon from "@/assets/img/sefl_logo.png"
import useCustomToast from "./hooks/useCustomToast"
interface Props {

}

const Login = (_props: Props) => {

    const navigate = useNavigate();
    const accepted_role = ["ROLE_QC", "ROLE_VERIFIER", "ROLE_AUDITOR"];
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const {errorToast } = useCustomToast()
    
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true)

        const user = {
            "username": username,
            "password": password
        }
        try {
            const response = await api.post(
                "/credential/login",
                user
            );

            if (response.data.details.token) {

                if (!accepted_role.includes(response.data.details.authorities[0])) {
                    alert("Access denied, user role restricted.")
                    return
                }
                Cookies.set("jt", response.data.details.token, coookie_options);

                // ENSURE THAT COOKIE IS CREATED BEFORE IT PROCEED

                for (let i = 0; i <= 10; i++) {
                    console.log("saving credentials")
                    Cookies.set("jt", response.data.details.token, coookie_options);

                }
                if (!Cookies.get("jt")) {
                    errorToast("Login Error", 'Failed to save credentials', 2000);
                  
                    window.location.reload();
                }
                Cookies.set("user", user.username, coookie_options)
                Cookies.set("role", response.data.details.authorities[0], coookie_options)
                Cookies.set("client", response.data.details.clients[0], coookie_options)
                Cookies.set("auto_request", "0", coookie_options)
              
                navigate("/")
            }

        } catch (error: any) {
            console.log(error)
            // toast.error(error.response.data.details, {
            //     description: `${error.response.data.message}.`,
            //     duration: 5000
            // })
            errorToast(error.response.data.details,error.response.data.message, 5000);
           
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        if (Cookies.get("jt")) {
            navigate("/")
            return
        };
    }, [])

    return (
        <div className="flex justify-center items-center relative h-svh flex-col">


            <Card className="relative">
                <div>
                    <img src={SelfIcon} alt="s-icon" className="h-28 w-60 absolute -top-[50px] left-[20%]" />
                </div>
                <CardHeader className="mt-8">
                    {/* <CardTitle className="text-center text-[1.2rem] font-bold text-gray-950">Login </CardTitle> */}
                    <CardDescription>Enter your email and passord below to login your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="login" onSubmit={onSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Username</Label>
                                <Input autoFocus id="name" style={{textTransform:"none"}} placeholder="Username" autoComplete="nofill" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <div className="relative">
                                    <Input id="password" style={{textTransform:"none"}} type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {
                                        !showPassword ? <EyeIcon onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-2  hover:cursor-pointer" />
                                            : <EyeOffIcon onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-2 hover:cursor-pointer" />
                                    }

                                </div>


                            </div>

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button form="login" disabled={password.trim().length < 1 || username.trim().length < 1 ? true :false} className="w-full bg-slate-900 hover:bg-red-900 dark:text-white" type="submit"> {loading ? <div className="flex items-center"><Loader2Icon color={"#fff"} className="w-4 h-4 animate-spin mr-2" /> <span className={cn(loading ? "animate-pulse" : '')}> Logging In ... </span></div> : "Login"}</Button>
                </CardFooter>
            </Card>

        </div>

    )
}

export default Login