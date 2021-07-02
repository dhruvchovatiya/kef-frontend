import React from 'react'
import logo from './resources/kefLogo2.png'


function About() {
    return (

        <div className="my-14 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0 my-auto ml-4">
                    <img className="h-48 w-full object-contain md:w-48" src={logo} alt="Logo" />
                </div>
                <div className="p-8">
                    {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Cat News</div> */}
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline text-center">About Kotak Education Foundation</a>
                    <br/>
                    <p className="mt-2 text-gray-500">Kotak Education Foundation is a non-profit organization set up in 2007, with its headquarters located in Mumbai.</p>
                    <br/>
                    <p className="mt-2 text-gray-500">It was formed with the intention of supporting children and youth from underprivileged families through different education-based interventions and skill-training programs.</p>
                    <br/>
                    <p className="mt-2 text-gray-500">With over 200 employees and plenty of volunteers, KEF has undertaken several initiatives such as Umang, Lead, Guru, Excel and Parvarish. Each of them having greatly positive influences on the livelihood of the underprivileged children of India</p>

                </div>
            </div>
        </div>
    )
}

export default About
