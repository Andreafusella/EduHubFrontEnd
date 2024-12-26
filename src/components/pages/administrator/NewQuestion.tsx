import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import IQuestionProps from "@/interface/Question";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterSchema = z.object({
    question: z.string().min(1, { message: "Question must be at least 1 characters" }),
    textA: z.string().min(1, { message: "Answer A must be at least 1 characters" }),
    textB: z.string().min(1, { message: "Answer B must be at least 1 characters" }),
    textC: z.string().min(1, { message: "Answer C must be at least 1 characters" }),
    textD: z.string().min(1, { message: "Answer D must be at least 1 characters" }),
});

type TRegisterSchema = z.infer<typeof RegisterSchema>;

type TFormData = {
    id_quiz: number;
    question: string;
    textA: string;
    textB: string;
    textC: string;
    textD: string;
    right_answer: string;
};

function NewQuestion() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_quiz: number = parseInt(queryParams.get("id_quiz") || "0", 10);
    const [loading, setLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<IQuestionProps[]>([]);
    const [formData, setFormData] = useState<TFormData>({
        id_quiz: id_quiz,
        question: "",
        textA: "",
        textB: "",
        textC: "",
        textD: "",
        right_answer: "",
    });

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<TRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        mode: "onSubmit",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNext: SubmitHandler<TRegisterSchema> = (data) => {
        if (!selectedAnswer) {
            return;
        }

        setQuestions((prev) => [...prev, { ...data, id_quiz: id_quiz, right_answer: selectedAnswer }]);

        if (questionIndex === 9) {
            submitHandler();
            return;
        }

        setFormData({
            id_quiz: id_quiz,
            question: "",
            textA: "",
            textB: "",
            textC: "",
            textD: "",
            right_answer: "",
        });

        setSelectedAnswer("");
        setQuestionIndex((prev) => prev + 1);
    };

    const submitHandler = async () => {
        console.log("Submitting questions:", questions);
        try {
            setLoading(true);
            for (const question of questions) {
                const res = await axios.post(`http://localhost:8000/question`, question);
                console.log(res.status);
            }
            toast.success("Quiz created successfully");
            navigate(-2);
            setLoading(false)
        } catch (err) {
            console.error(err);
            toast.error("Failed to create quiz");
            setLoading(false);
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <Progress value={(questionIndex + 1) * 10} max={100} className="bg-slate-50 border-gray-200 shadow-lg border-[1px] w-1/2" />
            <h1 className="text-green-600 font-bold text-center my-5 text-3xl">
                {questionIndex === 9 ? "Submit" : "Question " + (questionIndex + 1)}
            </h1>
            <section className="bg-gray-50 p-6 rounded-xl w-[400px] shadow-lg mx-auto">
                <form onSubmit={handleSubmit(handleNext)}>
                    <div className="space-y-3">
                        <div>
                            <Input
                                {...register("question", { required: true })}
                                type="text"
                                name="question"
                                placeholder="Question"
                                value={formData.question}
                                onChange={handleInputChange}
                                className="bg-white h-12 border-b-2 border-t-0 border-l-0 border-r-0 p-2 shadow-md"
                            />
                            {errors.question && <p className="text-red-500">{errors.question.message}</p>}
                        </div>
                        {["textA", "textB", "textC", "textD"].map((answer, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Checkbox
                                    checked={selectedAnswer === answer}
                                    onCheckedChange={() => handleCheckboxChange(answer)}
                                    className="border-gray-300 shadow-md"
                                />
                                <div className="flex flex-col gap-1 w-full">
                                    <Input
                                        {...register(answer, { required: true })}
                                        type="text"
                                        name={answer}
                                        placeholder={`Answer ${String.fromCharCode(65 + index)}`}
                                        value={formData[answer as keyof TFormData]}
                                        onChange={handleInputChange}
                                        className="bg-white h-12 border-b-2 border-t-0 border-l-0 border-r-0 p-2 shadow-md"
                                    />
                                    {errors[answer] && <p className="text-red-500">{errors[answer].message}</p>}

                                </div>
                            </div>
                        ))}
                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600"
                            disabled={!selectedAnswer || loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                questionIndex === 9 ? "Submit" : "Next"
                            )}
                        </Button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default NewQuestion;