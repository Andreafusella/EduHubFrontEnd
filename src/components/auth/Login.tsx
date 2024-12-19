import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const LoginSchema = z.object({
    email: z.string().email("Email non valida"),
    password: z.string().min(5, "La password deve avere almeno 5 caratteri").regex(/[A-Z]/, "La password deve avere almeno una lettera maiuscola"),
})

type LoginFormData = z.infer<typeof LoginSchema>

function Login() {

    const {setAsLogged} = useAuth()

    const [error, setError] = useState<"generic" | "credentials" | null>(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        mode: 'onSubmit'
    })

    const submiHandler: SubmitHandler<LoginFormData> = (data) => {
        loginUser()
        async function loginUser() {
            setIsSubmitting(true)
            try {
                const res = await fetch("http://localhost:8000/login", {
                    method: "POST",
                    headers: {
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                    })
                })
    
                if(res.status == 201) {
                    const data = await res.json()
                    setError(null);
                    setSuccess(true);            
                    setAsLogged(data.token, data.role);
                    
                    
                } else if (res.status == 401) {
                    const data = await res.json()
                    console.log(data.message);
                    setError("credentials");
                    setIsSubmitting(false)
                    return;
                    
                }

            } catch (error) {
                setSuccess(false)
                setError("generic");
            }
            
            setIsSubmitting(false)
        }
    }

    return(
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-white text-3xl mb-5 font-bold">Login</h1>
            <div className="p-4 bg-gray-100 rounded-xl w-[400px]">
                <form id="loginForm" onSubmit={handleSubmit(submiHandler)} className="flex flex-col gap-3">
                    <h1>Email</h1>
                    <Input 
                        {...register("email", {required: true})}
                        id="emailValue"
                        name="email"
                        placeholder="example@com"
                        type="text"
                        className="h-12"
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    <h1>Password</h1>
                    <Input 
                        {...register("password", {required: true})}
                        id="passwordValue"
                        name="password"
                        placeholder="*********"
                        type="password"
                        className="h-12"
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    <div className="flex gap-3 justify-end mt-5">
                        <Link to="/">
                            <Button type="button" className="hover:bg-slate-700">Cancel</Button>
                        </Link>
                        <Button disabled={isSubmitting} type="submit" className="bg-blue-600 hover:bg-blue-800">
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <img src="../../../public/svg/loading.svg" className="size-5"/>
                                </div>
                            ) : (
                                <h1>Login</h1>
                            )}
                        </Button>
                    </div>
                </form>
                {error && (
                <Alert variant="destructive" className="mt-2">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>
                        {error == "credentials" ? "Invalid credentials" : "Error during login"}
                    </AlertTitle>
                    <AlertDescription>
                        {error == "credentials"
                            ? "The provided credentials are not correct."
                            : "There was an error during login action"}
                    </AlertDescription>
                </Alert>
                )}
                {success && (
                    <Alert variant="success" className="mt-2">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Login Successful!</AlertTitle>
                        <AlertDescription>
                            You will be redirected to the home page in 3 seconds or click{" "}
                            <Link to="/auth/login" className="underline font-bold">
                                here
                            </Link>
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    )
}

export default Login