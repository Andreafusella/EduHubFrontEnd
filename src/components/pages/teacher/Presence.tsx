import CardStudentPresence from "@/components/common/CardStudentPresence";
import { Button } from "@/components/ui/button";
import IAccountProps from "@/interface/Account";
import axios from "axios";
import { ArrowLeft, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Presence() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_lesson: number = parseInt(queryParams.get('id_lesson') || '0', 10);
    const [account, setAccount] = useState<IAccountProps[]>([]);
    const [presences, setPresences] = useState<{ [id_account: number]: boolean }>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            async function fetchLesson() {
                const res = await axios.get(`http://localhost:8000/get-student-by-presence?id_lesson=${id_lesson}`);
                setAccount(res.data);
            }
            fetchLesson();
        } catch (err) {
            console.error(err);
        }
    }, [id_lesson]);

    function handlePresenceUpdate(id_account: number, presence: boolean) {
        setPresences(prevPresences => ({
            ...prevPresences,
            [id_account]: presence
        }));
    }

    async function savePresences() {
        setLoading(true);
        try {
            const presenceData = Object.keys(presences).map(id_account => ({
                id_account: parseInt(id_account, 10),
                id_lesson: id_lesson,
                presence: presences[parseInt(id_account, 10)]
            }));
            console.log(presenceData);

            const res = await axios.post('http://localhost:8000/update-presences', presenceData);
            if (res.status === 200) {
                toast.success("Presenze aggiornate con successo!");
            } else {
                toast.error("Errore nell'aggiornamento delle presenze.");
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Errore nell'aggiornamento delle presenze.");
        } finally {
            setLoading(false);
        }
    }

    function listStudent() {
        return (
            <div className="space-y-4">
                {account.map((account: IAccountProps) => (
                    <CardStudentPresence account={account} onUpdatePresence={handlePresenceUpdate} key={account.id_account} />
                ))}
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-center items-center mb-5 gap-10">
                <Button onClick={() => navigate(-1)} className="bg-slate-500 hover:bg-slate-600">
                    <ArrowLeft></ArrowLeft>
                    Back
                </Button>
                <h1 className="text-2xl font-bold text-green-600">Presence</h1>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl flex flex-col">
                {listStudent()}
                <Button disabled={loading} onClick={savePresences} className="bg-green-600 hover:bg-green-700 text-white mt-5">
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <h1 className='hidden md:block'>Save</h1>
                    )}
                </Button>
            </div>
        </>
    )
}

export default Presence