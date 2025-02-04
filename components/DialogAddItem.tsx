import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { Label } from "./ui/label"
import { useState } from "react"
import { CreateItem, Item } from "@/database/CRUD"

interface DialogAddItemProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

  
export default function DialogAddItem({isOpen, setIsOpen}: DialogAddItemProps) {

    const [item, setItem] = useState<Item>({name: '', description: '', quantity: 0, minStock: 0})


    function handleCreateItem() {
        if (item.name.trim() === '' || item.description.trim() === '' || item.quantity === 0 || item.minStock === 0) {
            return;
        }
        
        CreateItem(item)
        setIsOpen(false)
        
    }

    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>

            <DialogHeader>
              <DialogTitle>Adicione seu item:</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                    <Label className="font-bold">Nome do produto</Label>
                    <Input onChange={(e) =>
                      setItem((prevItem) => ({...prevItem, name: e.target.value }))
                    }
                    placeholder="Nome" className=""/>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label className="font-bold">Descrição do produto</Label>
                    <Input onChange={(e) =>
                      setItem((prevItem) => ({...prevItem, description: e.target.value }))
                    }
                    placeholder="Descrição do produto" className=""/>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label className="font-bold">Quantidade</Label>
                    <Input type="number" onChange={(e) =>
                      setItem((prevItem) => ({...prevItem, quantity: Number(e.target.value) }))
                    }
                    placeholder="Quantidade" className=""/>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label className="font-bold">Quantidade Minima</Label>
                    <Input type="number" onChange={(e) =>
                      setItem((prevItem) => ({...prevItem, minStock: Number(e.target.value) }))
                    }
                    placeholder="Quantidade Minima" className=""/>
                </div>
            </div>
            
            <Button onClick={handleCreateItem} className="bg-blue-700 hover:bg-blue-900 transition-all duration-300"><Plus/>Add item</Button>
          </DialogContent>
        </Dialog>
    )
}