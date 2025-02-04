'use client'
import StockCard from "@/components/Card";
import Header from "@/components/Header";
import { Item } from "@/database/CRUD";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ReadItem } from "../database/CRUD";

export default function Home() {


  const [itens, setItens] = useState<Item[]>([]);
  
  useEffect(() => {
    async function fetchItems() {
      const localItens = await ReadItem();
      setItens(localItens);
    }
  
    fetchItems();
  
    const handleStorageChange = () => {
      fetchItems();
    };
  
    window.addEventListener("localStorageUpdated", handleStorageChange);
  
    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
    };
  }, []);


  return (
    <div className="">
      <Header/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-8">
        {itens.map((item, index) => {
          return (
            <StockCard
              key={index}
              id={index.toString()}
              name={item.name}
              description={item.description}
              quantity={item.quantity}
              minStock={item.minStock}
              lastUpdated={new Date().toLocaleDateString()}
            />
          );
        })}
      </div>
    </div>
  );
}
