import React from 'react';
import './Auth.css'
import { useForm } from "react-hook-form";

const SignIn = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {

        console.log(data)
        const userData = {
            email: data.email,
            password: data.password,
        };
        console.log(userData);
        console.log(JSON.stringify(userData));
        fetch("http://localhost:9000/api/signIn", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem("userInfo", JSON.stringify(data));
            })
            .catch(err => console.log(err))

    }
    return (
        <>
            <div class="form-container sign-in-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Sign in</h1>
                    <div class="social-container">
                        {/* <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> */}
                    </div>
                    <span>or use your account</span>
                    {/* <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" /> */}
                    <input {...register("email", { required: true })} type="email" placeholder="Email" />
                    {errors.email && <span>This field is required</span>}
                    <input {...register("password", { required: true })} type="password" placeholder="Password" />
                    {errors.password && <span>This field is required</span>}
                    {/* <button >Sign Up</button> */}
                    <a href="#">Forgot your password?</a>
                    {/* <button>Sign In</button> */}
                    <input className="button" type="submit" />
                </form>
            </div>
        </>
    );
};

export default SignIn;