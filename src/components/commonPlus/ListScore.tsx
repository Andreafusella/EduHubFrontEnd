import { useSettingContext } from "@/context/SettingContext";
import IScoreListProps from "@/interface/ScoreList";
import { Trophy } from "lucide-react";

import medal1 from "/public/svg/medal1.svg";
import medal2 from "/public/svg/medal2.svg";
import medal3 from "/public/svg/medal3.svg";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";

function ListScore({ score, id_course }: { score: IScoreListProps[], id_course: number }) {
    const { getAvatar } = useSettingContext();
    const navigate = useNavigate();

    const getMedal = (index: number) => {
        if (index === 0) return medal1;
        if (index === 1) return medal2;
        if (index === 2) return medal3;
        return null;
    };

    return (
        <div className="bg-gray-50 p-4 rounded-xl w-[350px]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center">
                    <Trophy className="size-8 text-green-600" />
                    <h1 className="text-lg text-green-600 font-bold">Top 5 Students</h1>
                </div>
                <Button onClick={() => navigate(`/administrator-home/subject/list-student-course?id_course=${id_course}`)} className="bg-green-600 text-white hover:bg-green-700">View All</Button>
            </div>
            {score.length === 0 ? (
                <p className="text-gray-500 font-bold text-center">No students found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm rounded-lg">
                        <thead>
                            <tr className="bg-green-100 text-green-800">
                                <th className="p-3 text-center">Student</th>
                                <th className="p-3 text-center">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {score.map((student, index) => (
                                <tr
                                    key={student.id_account}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}
                                >
                                    <td className="p-3 flex items-center gap-3">
                                        
                                        {index < 3 && (
                                            <img
                                                src={getMedal(index)!}
                                                alt="Medal"
                                                className="size-8"
                                            />
                                        )}
                                        
                                        <img
                                            src={getAvatar(student.avatar)}
                                            alt="Avatar"
                                            className="size-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-green-700 font-medium">
                                                {student.name} {student.last_name}
                                            </p>
                                            <p className="text-sm text-gray-500">{student.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-3 text-green-700 text-center font-medium">
                                        {student.score}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ListScore;