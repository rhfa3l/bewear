"use client";

import Image from "next/image";

const PartnersList = () => {
  const partners = [
    {
      name: "Nike",
      image: "/nike.svg",
    },
    {
      name: "Adidas",
      image: "/adidas.svg",
    },
    {
      name: "Puma",
      image: "/puma.svg",
    },
    {
      name: "New Balance",
      image: "/new-balance.svg",
    },
    {
      name: "Converse",
      image: "/converse.svg",
    },
    {
      name: "Polo",
      image: "/polo.svg",
    },
    {
      name: "Zara",
      image: "/zara.svg",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>
      <div className="flex gap-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {partners.map((partner) => (
          <div key={partner.name} className="flex flex-col gap-4">
            <div className="flex size-30 items-center justify-center rounded-4xl border-2">
              <Image
                src={partner.image}
                alt={partner.name}
                width={0}
                height={0}
                className="h-[50px] w-[50px] object-contain"
              />
            </div>
            <p className="text-center text-sm font-semibold">{partner.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersList;
