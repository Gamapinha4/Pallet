'use client'
import { Package, Plus } from "lucide-react";

import { Button } from "./ui/button";
import DialogAddItem from "./DialogAddItem";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="flex flex-row justify-between items-center p-8">
            <div className="flex flex-row items-center gap-2">
                <Package className="text-blue-700 w-8 h-8"/>
                <h1 className="text-blue-700 font-bold text-3xl">Pallet</h1>
            </div>
            <DialogAddItem isOpen={isOpen} setIsOpen={setIsOpen}/>
            <Button onClick={() => setIsOpen(true)} className="bg-blue-700 hover:bg-blue-900 transition-all duration-300"><Plus/> Add Item</Button>
        </div>
    )
};