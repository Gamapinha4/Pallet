"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import {UpdateItem, DeleteItem, Item} from '../database/CRUD'
import toast from "react-hot-toast"

interface StockCardProps {
  id: string
  name: string
  description: string
  quantity: number
  minStock: number
  lastUpdated: string
}

export default function StockCard({
  id,
  name,
  description,
  quantity,
  minStock,
  lastUpdated,
}: StockCardProps) {
  const [updateAmount, setUpdateAmount] = useState(0)

  const handleUpdate = (increase: boolean) => {
    const newQuantity = increase ? quantity + updateAmount : quantity - updateAmount
    if (newQuantity <= 0) {
        toast.error("Quantidade não pode ser menor que 0", { icon: "🚫" })
        return;
    }

    UpdateItem({name, description, quantity: newQuantity, minStock})
    increase ? toast(`Foi adicionado ${updateAmount}x ${name}`, { icon: "📈" }) : toast(`Foi removido ${updateAmount}x ${name}`, { icon: "📉" })
    setUpdateAmount(0)
  }

  function handleDelete() {
    toast(`${name} deletado!`, { icon: "🗑️" })
    DeleteItem({name, description, quantity, minStock})
  }

  const stockStatus = quantity <= minStock ? "Baixo" : "Normal"

  return (
    <Card className="w-full max-w-md bg-white border-l-4 border-l-blue-700">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-800">{name}</h3>
            <p className="text-sm text-zinc-500">{description}</p>
          </div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              stockStatus === "Baixo" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}
          >
            {stockStatus}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-zinc-500">Quantidade</p>
            <p className="font-medium text-zinc-800">{quantity}</p>
          </div>
          <div>
            <p className="text-zinc-500">Estoque Mínimo</p>
            <p className="font-medium text-zinc-800">{minStock}</p>
          </div>
          <div className="col-span-2">
            <p className="text-zinc-500">Última Atualização</p>
            <p className="font-medium text-zinc-800">{lastUpdated}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Input
            type="number"
            min={0}
            value={updateAmount}
            onChange={(e) => setUpdateAmount(Math.max(0, Number(e.target.value)))}
            className="w-20 bg-zinc-50 border-zinc-200"
            placeholder="Qtd"
          />
          <div className="flex gap-2">
            <Button onClick={() => handleDelete()} className="w-12" variant={'destructive'}>
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button onClick={() => handleUpdate(false)} className="w-12 bg-blue-700 hover:bg-blue-600 text-white">
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button onClick={() => handleUpdate(true)} className="w-12 bg-blue-700 hover:bg-blue-600 text-white">
              <ChevronUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

