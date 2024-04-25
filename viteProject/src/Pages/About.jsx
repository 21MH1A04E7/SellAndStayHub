import React from "react";

function About() {
  return (
    <div className="max-w-6xl mx-auto mt-5">
      <div className="p-5 flex flex-col sm:flex-row">
        <div className="flex flex-col gap-2">
          <p className="text-gray-800 text-xl sm:text-3xl font-bold">About StayAndSellHub</p>
          <h1 className="text-green-600 font-semibold text-lg ">Find Your Perfect Home: Rent & Sell with Ease!</h1>
          <p className="italic text-gray-500">
            A platform for connecting buyers and sellers in the local real estate market.
            StayAndSellHub is a platform that helps you find your perfect home
            to rent and sell with ease.
          </p>
          <p className="italic text-gray-600">
            At StayAndSellHub, we're dedicated to simplifying the process of
            finding your ideal home, whether you're looking to rent or sell. We
            understand that searching for the perfect place can be overwhelming,
            which is why we've created a platform that streamlines the
            experience, making it easier and more efficient for both tenants and
            homeowners alike.
          </p>
          <p className="text-gray-600 italic">
            At StayAndSellHub, we're dedicated to simplifying the process of
            finding your ideal home, whether you're looking to rent or sell. We
            understand that searching for the perfect place can be overwhelming,
            which is why we've created a platform that streamlines the
            experience, making it easier and more efficient for both tenants and
            homeowners alike. For renters, our platform offers a wide range of
            listings, from cozy apartments to spacious houses, all conveniently
            organized to match your preferences and requirements. With detailed
            descriptions, high-quality images, and helpful filters, you can
            quickly narrow down your options and find the home that suits you
            best.
          </p>
          <p className="text-gray-600 italic">
            For homeowners looking to sell, StayAndSellHub provides a
            user-friendly interface to showcase your property to potential
            buyers. Our platform maximizes exposure for your listing, ensuring
            that it reaches a wide audience of interested individuals. Whether
            you're selling a starter home or a luxury estate, we're here to help
            you connect with the right buyer efficiently.
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default About;
