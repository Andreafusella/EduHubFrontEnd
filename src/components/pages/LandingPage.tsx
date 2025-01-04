import { Button } from "@/components/ui/button";
import { TableProperties } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    const handleLogin = () => {
        navigate('/auth/login');
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white text-center px-6 md:px-12">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight">
                        Your Journey to Success Starts Here
                    </h1>
                    <p className="mt-4 text-xl sm:text-2xl">
                        Unlock new opportunities with our powerful and easy-to-use platform.
                    </p>
                    {token ? (
                        <Link to={role == "Student" ? "/student-home" : role == "Teacher" ? "/teacher-home" : "/administrator-home"}>
                            <Button
                                className="mt-8 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
                                >
                                Enter Now
                            </Button>
                        </Link>
                        
                    ) : (
                        <Button
                            onClick={handleLogin}
                            className="mt-8 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
                        >
                            Login Now
                        </Button>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Choose Us?</h2>
                {/* Feature 1 */}
                <div className="md:flex md:flex-row flex flex-col items-center justify-center gap-10">
                    <div className="p-3 border-4 rounded-lg">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-green-100 text-green-800">
                                    <th className="p-3 text-center">Title</th>
                                    <th className="p-3 text-center">Date</th>
                                    <th className="p-3 text-center">Start</th>
                                    <th className="p-3 text-center">End</th>
                                    <th className="p-3 text-center">Presence</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3 text-green-700 font-medium text-center">Python</td>
                                    <td className="p-3 text-gray-700 text-center">2024-01-01</td>
                                    <td className="p-3 text-gray-700 text-center">10:00</td>
                                    <td className="p-3 text-gray-700 text-center">12:00</td>
                                    <td className="p-3 text-green-600 font-bold text-center">Present</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 text-green-700 font-medium text-center">Python</td>
                                    <td className="p-3 text-gray-700 text-center">2024-01-01</td>
                                    <td className="p-3 text-gray-700 text-center">10:00</td>
                                    <td className="p-3 text-gray-700 text-center">12:00</td>
                                    <td className="p-3 text-red-600 font-bold text-center">Absent</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 text-green-700 font-medium text-center">Python</td>
                                    <td className="p-3 text-gray-700 text-center">2024-01-01</td>
                                    <td className="p-3 text-gray-700 text-center">10:00</td>
                                    <td className="p-3 text-gray-700 text-center">12:00</td>
                                    <td className="p-3 text-green-600 font-bold text-center">Present</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 text-green-700 font-medium text-center">Python</td>
                                    <td className="p-3 text-gray-700 text-center">2024-01-01</td>
                                    <td className="p-3 text-gray-700 text-center">10:00</td>
                                    <td className="p-3 text-gray-700 text-center">12:00</td>
                                    <td className="p-3 text-red-600 font-bold text-center">Absent</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="max-w-xl text-center">
                        <div className="flex gap-2 items-center justify-center mb-4">
                            <TableProperties className="size-10 text-green-600" />
                            <h1 className="text-2xl font-semibold text-green-600">Easy-to-Read and Intuitive Table</h1>
                        </div>
                        <p className="text-lg text-gray-500 font-bold">
                            This table provides a clear, organized view of your lessons and their attendance status.
                            With easy-to-read color codes and a user-friendly layout, you can quickly understand the details
                            of each lesson, including the title, date, times, and attendance. The use of vibrant colors helps
                            differentiate between present and absent students, making it even simpler to track class participation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Feature 2 */}
            <section className="bg-gray-100 p-10 flex md:flex-row flex-col items-center justify-center gap-10">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex gap-2 items-center justify-center mb-4">
                        <img src="/public/png/landing/campana_notifiche.png" alt="" className="size-20"/>
                        <h1 className="text-2xl font-bold text-green-600">Email Notification</h1>
                    </div>
                    <p className="text-lg text-gray-500 font-bold">
                        Receive email notifications for your lessons, <br />ensuring you never miss an important class.
                    </p>
                </div>
                <div>
                    <img src="/public/png/landing/emailTel.png" alt="" className="w-[250px] h-[500px]"/>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-white text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-10">What Our Clients Say</h2>
                <div className="flex flex-wrap justify-center gap-8 px-4">
                    {/* Testimonial 1 */}
                    <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-1/3">
                        <p className="text-lg text-gray-700 font-bold">
                            "This platform has completely transformed the way we manage our business!"
                        </p>
                        <h1 className="text-2xl mb-4">⭐️⭐️⭐️⭐️⭐️</h1>
                        <span className="font-semibold text-green-600">John Doe</span>
                        <p className="text-gray-500">CEO, Example Corp</p>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-1/3">
                        <p className="text-lg text-gray-700 font-bold">
                            "An amazing tool! It saved us hours of work each week."
                        </p>
                        <h1 className="text-2xl mb-4">⭐️⭐️⭐️⭐️⭐️</h1>
                        <span className="font-semibold text-green-600">Jane Smith</span>
                        <p className="text-gray-500">Founder, Tech Solutions</p>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-1/3">
                        <p className="text-lg text-gray-700 font-bold">
                            "The support team is outstanding, and the product is intuitive and easy to use."
                        </p>
                        <h1 className="text-2xl mb-4">⭐️⭐️⭐️⭐️⭐️</h1>
                        <span className="font-semibold text-green-600">Sam Wilson</span>
                        <p className="text-gray-500">Product Manager, InnovateX</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section id="cta" className="py-20 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white text-center">
                <h2 className="text-3xl font-semibold sm:text-4xl mb-6">Ready to Get Started?</h2>
                <p className="text-lg sm:text-xl mb-6">Join thousands of users who have already transformed their business!</p>
                {token ? (
                    <Link to={role == "Student" ? "/student-home" : role == "Teacher" ? "/teacher-home" : "/administrator-home"}>
                        <Button
                            className="mt-8 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
                            >
                            Enter Now
                        </Button>
                    </Link>
                    
                ) : (
                    <Button
                        onClick={handleLogin}
                        className="mt-8 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
                    >
                        Login Now
                    </Button>
                )}
            </section>
        </div>
    );
}

export default LandingPage;