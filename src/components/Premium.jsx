import axios from "axios";
import React from "react";
import {useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false);
    useEffect(() => {
        verifyPremiumUser()
    }, []) 
    const verifyPremiumUser = async (response) => {
        try {
            const res = await axios.get(BASE_URL + '/premium/verify', { withCredentials: true })
            if (res.data.isPremium) {
                setIsUserPremium(true);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleBuyClick = async (membershipType) => {
        try {
            const order = await axios.post(BASE_URL + '/payment/create',
                {
                    membershipType: membershipType
                },
                { withCredentials: true }
            )
            //It should open razorpay dialog box
            const { amount, keyId, currency, notes, orderId } = order.data;
            const options = {
                key: keyId, // Replace with your Razorpay key_id
                amount: amount, // Amount is in currency subunits.
                currency: currency,
                name: 'Dev Tinder',
                description: 'Connect to other developers',
                order_id: orderId, // This is the order_id created in the backend
                prefill: {
                    name: notes.firstName + ' ' + notes.lastName,
                    email: notes.emailId,
                    contact: "9089898978"
                },
                theme: {
                    color: '#F37254'
                },
                handler: verifyPremiumUser

            }

            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch (err) {
            console.log(err)
        }
    }
    return (!isUserPremium ?
        <div className="min-h-screen bg-base-200 px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Upgrade Your DevTinder Experience 🚀
                </h1>

                <p className="mt-4 text-base-content/70 text-lg">
                    Connect with more developers and unlock premium features.
                </p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card bg-base-100 shadow-xl border border-gray-300 hover:shadow-2xl transition duration-300">

                    <div className="card-body">

                        <div className="text-center">
                            <div className="text-5xl mb-4">🥈</div>

                            <h2 className="text-3xl font-bold">
                                Silver Membership
                            </h2>

                            <p className="text-base-content/60 mt-2">
                                Perfect for developers who want more connections.
                            </p>
                        </div>
                        <ul className="space-y-4 text-lg">

                            <li className="flex gap-3">
                                <span className="text-success">✓</span>
                                Chat with other developers
                            </li>

                            <li className="flex gap-3">
                                <span className="text-success">✓</span>
                                100 connection requests per day
                            </li>

                            <li className="flex gap-3">
                                <span className="text-success">✓</span>
                                Verified Blue Tick
                            </li>
                            <li className="flex gap-3">
                                <span className="text-success">✓</span>
                                3 Months Validity
                            </li>
                        </ul>

                        <div className="card-actions mt-8">
                            <button onClick={() => handleBuyClick('silver')} className="btn btn-outline btn-primary w-full text-lg">
                                Buy Silver Membership
                            </button>
                        </div>

                    </div>
                </div>


                <div className="card bg-base-100 shadow-2xl border-2 border-warning relative overflow-hidden hover:shadow-3xl transition duration-300">


                    <div className="absolute top-4 -right-8.75 rotate-45 bg-warning text-warning-content px-10 py-2 text-sm font-bold">
                        POPULAR
                    </div>

                    <div className="card-body">


                        <div className="text-center">
                            <div className="text-5xl mb-4">🥇</div>

                            <h2 className="text-3xl font-bold">
                                Gold Membership
                            </h2>

                            <p className="text-base-content/60 mt-2">
                                The ultimate experience for active developers.
                            </p>
                        </div>
                        <ul className="space-y-4 text-lg">

                            <li className="flex gap-3">
                                <span className="text-success">✓</span>
                                Chat with other developers
                            </li>

                            <li className="flex gap-3">
                                <span className="text-success">✓</span>
                                Unlimited connection requests
                            </li>

                            <li className="flex gap-3">
                                <span className="text-success">✓</span>
                                Verified Blue Tick
                            </li>

                            <li className="flex gap-3">
                                <span className="text-success">✓</span>
                                6 Months Validity
                            </li>

                        </ul>


                        <div className="card-actions mt-8">
                            <button onClick={() => handleBuyClick('gold')} className="btn btn-warning w-full text-lg">
                                Buy Gold Membership
                            </button>
                        </div>

                    </div>
                </div>

            </div>



        </div> : "You are already a premium user. Enjoy the benefits!"
    );
};

export default Premium;