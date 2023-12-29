import { useState } from "react";
import feedback from "../utils/feedback.avif"


const ContactForm = () => {
    const [name, setName]= useState("")
    const [subject, setSubject]=useState("")
    const [email, setEmail]=useState("")
    const [message, setMessage]=useState("")

    const handleSubmit=()=>{
        const comment={name, subject, message};
        // fetch(url, {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(comment)
        // })
    }

    return (
        <div className="flex justify-around">
            <div className="hidden lg:block w-1/2">
                <img src={feedback} className="w-full" />
            </div>
            <form className=" max-w-lg p-5 rounded-lg" onSubmit={handleSubmit}>
                <h2 className="text-3xl mb-5">Feedback</h2>
                <fieldset className="">
                    <div className="">
                        <input className="w-full mb-6" type="text" placeholder='Full Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                        <input className="w-full mb-6"  type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <input className="w-full mb-6" type="text" placeholder='Subject' value={subject} onChange={(e)=>setSubject(e.target.value)} />
                    <textarea className="w-full resize-none" placeholder='Message' value={message} onChange={(e)=>setMessage(e.target.value)} ></textarea>
                    <button className="bg-blue-500 text-white p-1 rounded w-20">Send</button>
                </fieldset>
            </form>
            
        </div>
        
    );
}
 
export default ContactForm;