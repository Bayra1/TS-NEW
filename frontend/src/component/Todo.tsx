'use client'
import axios from "axios";
import { useState } from "react"

const backEnd = "http://localhost:8000/todoUrL";
export default function Todo() {
    const [data, setData] = useState([])
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [priority, setPriority] = useState()

    const VisualTodo = (title, description, priority) => {
        return (
            <div key={VisualData}>
                <div>{title}</div>
                <div>{description}</div>
                <div>{priority}</div>
            </div>
        )
    }


    const HandleTodo = async () => {
        try {
            const userData = await axios.post(backEnd, {
                title: title,
                description: description,
                priority: priority
            })
            console.log("this is data of todo of user", userData.data);
        } catch (error) {
            console.log("error at adding todoCard", error);
        }
    }


    return (
        <div className="w-[500px] p-2 bg-slate-400 mt-[200px] ml-[200px]">
            <div className="flex justify-between">
                <div className="flex items-center gap-1s">
                    <div className="text-4xl text-yellow-400">&#8226;</div>
                    <div className="text-xl text-black">To Do</div>
                </div>
                <div className="text-3xl items-center mb-[20px] text-black">&#8230;</div>
            </div>

            {/* Todo Card Section */}

            <div>
                <div id="VisualData"></div>
            </div>

            {/* this is add button with model */}
            <button className="btn w-full" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="flex flex-col gap-2">
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="title"
                            value={title}></input>
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="description"
                            value={description}></input>
                        <input
                            onChange={(e) => setPriority(e.target.value)}
                            placeholder="priority"
                            value={priority}></input>
                    </div>
                    <button onClick={HandleTodo} className="btn bg-blue-700">Add Card</button>
                </div>
            </dialog>



        </div>
    )
}