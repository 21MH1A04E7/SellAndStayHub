import React from 'react';

const Footer = () => {
    const currentDate = new Date().getFullYear();

    return (
        <footer className="bg-gray-600 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <img src="https://media.istockphoto.com/id/1215010498/vector/stay-at-home-paper-people.jpg?s=612x612&w=is&k=20&c=hzCOHBiJ2IVK7rn92uTCZkP64PZYGB8bolsktnrNGSI=" alt="StayAndSell Hub" className="h-8" />
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <ul className="flex justify-center md:justify-start space-x-4">
                            <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                            <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>

                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <ul className="flex justify-center md:justify-end space-x-4">
                            <li><a href="#"><i className="fab fa-facebook text-gray-300 hover:text-white"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter text-gray-300 hover:text-white"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram text-gray-300 hover:text-white"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-4 text-center text-gray-300">
                    <p>&copy; {currentDate} StayAndSell Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
