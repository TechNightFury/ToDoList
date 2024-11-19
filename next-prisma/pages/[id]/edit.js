import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Edit = () => {
    const router = useRouter();
    const { id } = router.query;
    
    const [task, setTask] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        const fetchTask = async () => {
            const response = await fetch(`/api/tasks/${id}`)
            const data = await response.json();
            
            setTask(data);
        };

        if (id) {
            fetchTask();
        }
    }, [id]);
    
    const onChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value});
    };

    const handleUpdate = async () => {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            router.push('/');
        }
        else {
            alert('Failed to edit task');
        }
    };

    return (
        <>
            <div className="container mx-auto mt-8 max-w-[560px]">
                <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
                    <h1 className="text-3xl font-semibold">Edit Task</h1>
                </div>
                <form>
                    <div className="mb-4">
                        <label>Title</label>
                        <input 
                            type="text"
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md block text-black w-full"
                            name="title"
                            value={task?.title}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label>Description</label>
                        <input 
                            type="text"
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md block text-black w-full"
                            name="description"
                            value={task?.description}
                            onChange={onChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
                        onClick={handleUpdate}
                    >
                        Edit Task
                    </button>
                </form>
            </div>
            <Head>
                <title>Edit Task</title>
            </Head>
        </>
    )
};

export default Edit;