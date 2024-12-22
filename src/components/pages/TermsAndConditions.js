import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaTags from "../common/MetaTags";

const TermsAndConditions = () => {
    const metaData = {
        title: "Terms & Conditions", desc: "Learn about Starring's Refund Policy: Hassle-free returns and refunds for your purchases."
    }

   const navigate = useNavigate();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <MetaTags data={metaData} />
            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
                <div className="w-full pb-5">
                    <a style={{cursor:'pointer'}} onClick={()=>navigate(-1)}>
                        <svg
                            width="62"
                            height="14"
                            viewBox="0 0 62 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M60.5 7H1M1 7L7 1M1 7L7 13"
                                stroke="black"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </a>
                </div>
                <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
                <p className="mb-6 text-gray-600">
                    Thank you for shopping with us! We strive to provide high-quality
                    products and excellent service. If you are not completely satisfied
                    with your purchase, we're here to help.
                </p>

                {/* Refund Policy */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                    <p>
                        Welcome to Starring! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. These terms outline the rules and regulations for the use of Starring's shopping platform, ensuring a seamless and secure shopping experience. If you do not agree with any of these terms, please refrain from using our services.
                    </p>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">
                            1. User Account and Conduct
                        </h3>
                        <p>
                            To shop on Starring, users may need to create an account. You are responsible for maintaining the confidentiality of your account details and for all activities conducted under your account. Any fraudulent activity, abusive behavior, or violation of these terms may result in account suspension or termination. Users must ensure all information provided is accurate and up-to-date.
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">
                        2. Orders and Payments
                        </h3>
                        <p>
                        By placing an order on Starring, you agree to purchase products listed on the website at the indicated prices, subject to availability. Starring reserves the right to cancel or modify orders in case of errors, stock issues, or suspicious activity. Payment must be completed using the secure methods provided on the website. All prices include applicable taxes unless otherwise stated.
                        </p>
                    </div>
                   
                </div>

               
                {/* Contact Us */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="text-gray-600">
                        If you have any questions or need assistance, please contact us at{" "}
                        <a
                            href="mailto:help@starring.co.in"
                            className="text-blue-500 hover:underline"
                        >
                            help@starring.co.in
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
