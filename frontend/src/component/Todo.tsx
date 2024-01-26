'use client'
import axios from "axios";
import { useState } from "react"

const backEnd = "http://localhost:8000/todoUrL";
export default function Todo() {
    type Todo = {
        title: string | undefined,
        description: string | undefined,
        priority: "High" | "Medium" | "Low";
    }

    type Category = {
        title: string | undefined,
        description: string | undefined,
        status: "Todo" | "InProgress" | "Over"
    }


    const [data, setData] = useState<Todo[]>([])
    const [title, setTitle] = useState<string | undefined>()
    const [description, setDescription] = useState<string | undefined>()
    const [priority, setPriority] = useState<"High" | "Medium" | "Low" | undefined>(undefined);

    const VisualTodo = ({ title, description, priority }: Todo) => (
        <div key={title}>
            <div>{title}</div>
            <div>{description}</div>
            <div>{priority}</div>
        </div>
    );

    const HandleTodo = async () => {
        try {
            const userData = await axios.post(backEnd, {
                title,
                description,
                priority,
            });

            if (userData.data.success === true) {
                const newData: Todo = { title, description, priority: priority as Todo["priority"] };
                setData([...data, newData]);
                (document.getElementById('my_modal_3') as HTMLDialogElement).close();
            }

            console.log("this is data of todo of user", userData.data);
        } catch (error) {
            console.log("error at adding todoCard", error);
        }
    };
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
                <div id="VisualData">
                    {
                        data.map((el, index) => {
                            return (
                                <div className="flex flex-col gap-2" key={index}>
                                    <div className="text-2xl text-black">{el.title}</div>
                                    <div className="text-lg text-slate-300">{el.description}</div>
                                    <div className="text-lg p-2 border-solid w-fit rounded bg-orange-500">{el.priority}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* this is add button with model */}
            <button className="btn w-full" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>open modal</button>
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
                        <select
                            onChange={(e) => setPriority(e.target.value)}
                            value={priority}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <button onClick={HandleTodo} className="btn bg-blue-700">Add Card</button>
                </div>
            </dialog>
        </div>
    )
}