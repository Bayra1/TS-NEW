"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const backEnd = "http://localhost:8000/auth/login";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            let response = await axios.post(backEnd, {
                username,
                password
            });
            const { success, data } = response.data
            console.log('this is response data', response);
            if (success === true) {
                router.push("/MainBoard");
            } else {
                setError('wrong Password or UserName')
            }
        } catch (error) {
            console.log('error at login page', error);
        }
    };

    const VisibilityPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex w-full">
            <div className="h-screen w-6/12 flex items-center justify-center">
                <div className="flex flex-col h-[554px] w-[384px]">
                    <div className="items-center justify-center flex flex-col mb-[20px]">
                        <div>Welcome Back</div>
                        <div>This is Login of TODO</div>
                    </div>
                    <div className="flex flex-col gap-[25px] ">
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="flex h-[48px] p-[16px] items-center border rounded-2xl"
                            placeholder="Username"
                        />
                        <div className="flex h-[48px]">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                className="flex w-[400px] h-[48px] relative p-[16px] items-center border rounded-2xl"
                                placeholder="Password"
                            />
                            <div
                                className="absolute mt-[10px] ml-[350px]"
                                onClick={VisibilityPassword}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogin}
                        className="mt-[40px] bg-blue-600 rounded-2xl w-[384px] h-[48px] justify-center items-center p-[16px]"
                    >
                        Sign up
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
            <div className="h-screen w-6/12 bg-blue-600">
            </div>
        </div>
    );
}
