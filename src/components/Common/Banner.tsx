import React from "react";

const Banner: React.FC = () => {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full group">
                        <img
                            alt=""
                            src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg"
                            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                        />
                        <img
                            alt=""
                            src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
                            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                        />
                    </div>
                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl">Encuentra los mejores destinos</h2>

                        <p className="mt-4 text-gray-600">
                            Descubre tu escapada perfecta en nuestra plataforma. 
                            Encuentra alojamientos ideales, desde acogedores bed and breakfasts hasta lujosos resorts, 
                            reserva fácilmente con garantía de mejor precio y 
                            disfruta de una experiencia de viaje sin complicaciones.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
