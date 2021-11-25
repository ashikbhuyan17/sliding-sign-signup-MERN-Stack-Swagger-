import React, { useState } from 'react';
import './Auth.css'
import SignIn from './SignIn';
import SignUp from './SignUp';

const Sign = () => {
    const [addClass, setAddClass] = useState("")
    return (
        <>
            <div className="body">
                <h2>Sign in/up Form</h2>
                <div class={`container ${addClass}`} id="container">

                    {/* signUp page */}
                    <SignUp />

                    {/* signIn page */}
                    <SignIn />

                    <div class="overlay-container">
                        <div class="overlay">
                            <div class="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button class="ghost" id="signIn" onClick={() => setAddClass()}>Sign In</button>
                            </div>
                            <div class="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button class="ghost" id="signUp" onClick={() => setAddClass("right-panel-active")}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
                    <p>
                        Created with <i class="fa fa-heart"></i> by
                        <a href="https://florin-pop.com">Florin Pop</a>
                        - Read how I created this and how you can join the challenge
                        <a href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
                    </p>
                </footer>
            </div>
        </>
    );
};

export default Sign;