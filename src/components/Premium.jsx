import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false);

    useEffect(() => {
        verifyPremiumUser();
    }, []);

    const verifyPremiumUser = async (response) => {
        try {
            const res = await axios.get(
                BASE_URL + "/premium/verify",
                { withCredentials: true }
            );

            if (res.data.isPremium) {
                setIsUserPremium(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleBuyClick = async (membershipType) => {
        try {
            const order = await axios.post(
                BASE_URL + "/payment/create",
                {
                    membershipType: membershipType
                },
                { withCredentials: true }
            );

            // It should open razorpay dialog box
            const { amount, keyId, currency, notes, orderId } = order.data;

            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: "Dev Tinder",
                description: "Connect to other developers",
                order_id: orderId,
                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: notes.emailId,
                    contact: "9089898978"
                },
                theme: {
                    color: "#F37254"
                },
                handler: verifyPremiumUser
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.log(err);
        }
    };

    return !isUserPremium ? (
        <div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200 px-5 py-12 md:px-10">

            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-14">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-5">
                    ✨ DevTinder Premium
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    Upgrade Your
                    <span className="text-primary"> DevTinder </span>
                    Experience 🚀
                </h1>

                <p className="mt-5 text-base-content/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Unlock premium features, connect with more developers,
                    and take your networking experience to the next level.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

                {/* Silver */}
                <div className="group relative">

                    <div className="absolute -inset-0.5 bg-linear-to-r from-slate-300 to-gray-400 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

                    <div className="relative h-full card bg-base-100 border border-base-300 shadow-xl rounded-3xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">

                        {/* Top Accent */}
                        <div className="h-2 bg-linear-to-r from-slate-300 via-gray-400 to-slate-500"></div>

                        <div className="card-body p-8 md:p-10">

                            <div className="text-center">

                                <div className="mx-auto w-20 h-20 rounded-full bg-linear-to-br from-gray-100 to-gray-300 flex items-center justify-center text-5xl shadow-inner mb-5">
                                    🥈
                                </div>

                                <h2 className="text-3xl font-bold">
                                    Silver Membership
                                </h2>

                                <p className="text-base-content/60 mt-3 leading-relaxed">
                                    Perfect for developers who want more
                                    connections and enhanced networking.
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mt-8 space-y-4">

                                <div className="flex items-center gap-4 p-3 rounded-xl bg-base-200/60">
                                    <div className="w-8 h-8 rounded-full bg-success/15 text-success flex items-center justify-center font-bold">
                                        ✓
                                    </div>
                                    <span>Chat with other developers</span>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-xl bg-base-200/60">
                                    <div className="w-8 h-8 rounded-full bg-success/15 text-success flex items-center justify-center font-bold">
                                        ✓
                                    </div>
                                    <span>100 connection requests per day</span>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-xl bg-base-200/60">
                                    <div className="w-8 h-8 rounded-full bg-success/15 text-success flex items-center justify-center font-bold">
                                        ✓
                                    </div>
                                    <span>Verified Blue Tick</span>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-xl bg-base-200/60">
                                    <div className="w-8 h-8 rounded-full bg-success/15 text-success flex items-center justify-center font-bold">
                                        ✓
                                    </div>
                                    <span>3 Months Validity</span>
                                </div>

                            </div>

                            {/* Button */}
                            <div className="card-actions mt-8">

                                <button
                                    onClick={() => handleBuyClick("silver")}
                                    className="btn btn-outline btn-primary w-full h-14 rounded-xl text-lg font-semibold hover:scale-[1.02] transition-transform"
                                >
                                    Buy Silver Membership
                                    <span className="text-xl">→</span>
                                </button>

                            </div>

                        </div>
                    </div>
                </div>


                {/* Gold */}
                <div className="group relative">

                    {/* Glow */}
                    <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-lg transition duration-500"></div>

                    <div className="relative h-full card bg-base-100 border-2 border-warning shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2">

                        {/* Popular Badge */}
                        <div className="absolute top-5 -right-10.5 rotate-45 bg-warning text-warning-content px-12 py-2 text-xs font-extrabold tracking-wider shadow-md">
                            POPULAR
                        </div>

                        {/* Top Accent */}
                        <div className="h-2 bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-500"></div>

                        <div className="card-body p-8 md:p-10">

                            <div className="text-center">

                                <div className="mx-auto w-20 h-20 rounded-full bg-linear-to-br from-yellow-200 via-yellow-400 to-orange-400 flex items-center justify-center text-5xl shadow-lg mb-5">
                                    🥇
                                </div>

                                <h2 className="text-3xl font-bold">
                                    Gold Membership
                                </h2>

                                <p className="text-base-content/60 mt-3 leading-relaxed">
                                    The ultimate experience for active
                                    developers who want unlimited networking.
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mt-8 space-y-4">

                                <div className="flex items-center gap-4 p-3 rounded-xl bg-warning/5">
                                    <div className="w-8 h-8 rounded-full bg-warning/20 text-warning flex items-center justify-center font-bold">
                                        ✓
                                    </div>
                                    <span>Chat with other developers</span>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-xl bg-warning/5">
                                    <div className="w-8 h-8 rounded-full bg-warning/20 text-warning flex items-center justify-center font-bold">
                                        ✓
                                    </div>
                                    <span>Unlimited connection requests</span>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-xl bg-warning/5">
                                    <div className="w-8 h-8 rounded-full bg-warning/20 text-warning flex items-center justify-center font-bold">
                                        ✓
                                    </div>
                                    <span>Verified Blue Tick</span>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-xl bg-warning/5">
                                    <div className="w-8 h-8 rounded-full bg-warning/20 text-warning flex items-center justify-center font-bold">
                                        ✓
                                    </div>
                                    <span>6 Months Validity</span>
                                </div>

                            </div>

                            {/* Button */}
                            <div className="card-actions mt-8">

                                <button
                                    onClick={() => handleBuyClick("gold")}
                                    className="btn btn-warning w-full h-14 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                                >
                                    Buy Gold Membership
                                    <span className="text-xl">👑</span>
                                </button>

                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Trust Text */}
            <div className="text-center mt-12 text-sm text-base-content/50">
                🔒 Secure payment powered by Razorpay
                <span className="mx-2">•</span>
                💳 Safe & secure checkout
            </div>

        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-200 via-base-100 to-base-200 px-6">

            <div className="max-w-lg w-full text-center">

                <div className="bg-base-100 rounded-3xl shadow-2xl border border-success/20 p-10 md:p-14">

                    <div className="mx-auto w-24 h-24 rounded-full bg-success/10 flex items-center justify-center text-5xl mb-6">
                        👑
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-semibold mb-5">
                        ✓ Premium Member
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold">
                        You're Already Premium! 🎉
                    </h1>

                    <p className="mt-4 text-base-content/60 text-lg leading-relaxed">
                        You already have access to all your premium
                        DevTinder benefits. Enjoy connecting with developers!
                    </p>

                    <div className="mt-8 flex justify-center gap-3 text-2xl">
                        🚀 💙 👨‍💻
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Premium;

